/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { LuchyProvider } from "@luchyio/react"
import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare"
import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"

export default async function handleRequest(
  request: Request,
  _responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) {
  let responseStatusCode = _responseStatusCode
  const body = await renderToReadableStream(
    <LuchyProvider
      autoTrackEvents={false}
      token={loadContext.cloudflare.env.PUBLIC_LUCHY_TOKEN}
      basePath="/luchy"
    >
      <RemixServer context={remixContext} url={request.url} />
    </LuchyProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error)
        responseStatusCode = 500
      },
    },
  )

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady
  }

  responseHeaders.set("Content-Type", "text/html")
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
