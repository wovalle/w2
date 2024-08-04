import type { PlatformProxy } from "wrangler"

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {
  PUBLIC_LUCHY_TOKEN: string
  NEON_CONNECTION_STRING: string
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare
  }
}
