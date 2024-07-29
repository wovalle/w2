import { getKyselyAdapter } from "@luchyio/adapter-kysely";
import { getLuchyDb } from "../app/utils/kysely";
import { cloudflareLuchyMiddlewareFactory } from "./luchy_cloudflare_middleware";

export const onRequest: PagesFunction<Env> = async (context) => {
  const adapter = getKyselyAdapter(getLuchyDb(context.env));

  const cfLuchyMiddleware = cloudflareLuchyMiddlewareFactory({
    adapter,
    token: context.env.PUBLIC_LUCHY_TOKEN,
    logger: console,
    basePath: "/luchy",
    environment: "development",
  });

  return cfLuchyMiddleware(context);
};
