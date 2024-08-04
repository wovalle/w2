import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"

import { LuchyProvider } from "@luchyio/react"

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <LuchyProvider
        autoTrackPageViews={false}
        basePath="/luchy"
        token={window.ENV.PUBLIC_LUCHY_TOKEN}
      >
        <RemixBrowser />
      </LuchyProvider>
    </StrictMode>,
  )
})
