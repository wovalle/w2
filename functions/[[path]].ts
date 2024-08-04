import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"

import * as build from "../build/server"

// @ts-expect-error seems that there's some incompatibility between remix and cloudflare types
export const onRequest = createPagesFunctionHandler({ build })
