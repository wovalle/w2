import { EventContext, Request } from "@cloudflare/workers-types";
import {
  luchyMiddleware,
  type LuchyMiddlewareInitOptions,
  type RequestLike,
  type ResponseLike,
} from "@luchyio/middleware";

const extractCloudflareStuff = async (
  req: Request,
  environment: "development" | "production" | undefined
): Promise<RequestLike> => {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams);

  let body: Record<string, unknown> | null = null;

  if (req.headers.get("content-type") === "application/json") {
    body = await req.json();
  }

  const isLuchyRequest = url.pathname.startsWith("/luchy");

  return {
    url: req.url,
    method: req.method,
    body,
    query: {
      ...params,
      select: params.select ? params.select.toString().split(",") : undefined,
    },
    token: req.headers.get("x-luchy-token") ?? null,
    isLuchyRequest,
    params: {
      acceptLanguage: req.headers.get("accept-language") ?? null,
      userAgent: req.headers.get("user-agent") ?? null,
      referrer: req.headers.get("referrer") ?? null,
      city: typeof req.cf?.city === "string" ? req.cf.city : null,
      country:
        typeof req.cf?.country === "string"
          ? req.cf.country
          : req.headers.get("cf-ipcountry") ?? null,
      personalIdentifier:
        req.headers.get("CF-Connecting-IP") ??
        req.headers.get("X-Forwarded-For") ??
        (environment === "development" ? "127.0.0.1" : undefined) ??
        null,
    },
  };
};

type CloudflareContext = Omit<
  EventContext<Env, any, Record<string, unknown>>,
  "next" | "env"
> & {
  next: () => Promise<Response>;
};

const cfResponseLikeHandler = (next: CloudflareContext["next"]) => {
  return async (opts: { reason: string; action: ResponseLike }) => {
    switch (opts.action.type) {
      case "response":
        return Response.json(opts.action.json, {
          status: opts.action.status,
        });

      case "next":
        return next();

      default:
        throw new Error("Invalid response-like type");
    }
  };
};

export const cloudflareLuchyMiddlewareFactory = (
  initOptions: Omit<LuchyMiddlewareInitOptions, "origin">
) => {
  return async (context: CloudflareContext) => {
    const reqLike = await extractCloudflareStuff(
      context.request,
      initOptions.environment
    );
    const handleResponseLike = cfResponseLikeHandler(context.next);
    const { logger } = initOptions;

    logger?.debug(
      "request",
      reqLike.method,
      reqLike.url,
      reqLike.isLuchyRequest
    );

    try {
      if (!reqLike.isLuchyRequest) {
        context.waitUntil(
          luchyMiddleware("@luchyio/cloudflare", initOptions, reqLike).then(
            handleResponseLike
          )
        );

        return await context.next();
      } else {
        return await luchyMiddleware(
          "@luchyio/cloudflare",
          initOptions,
          reqLike
        )
          .then(handleResponseLike)
          .catch((e) => {
            logger?.error("Error processing luchy message", e);

            return handleResponseLike({
              reason: "internal-error",
              action: {
                type: "response",
                status: 500,
                json: { error: { message: e.message } },
              },
            });
          });
      }
    } catch (e) {
      logger?.error("Error processing luchy message", e);

      return await handleResponseLike({
        reason: "internal-error",
        action: {
          type: "next",
        },
      });
    }
  };
};
