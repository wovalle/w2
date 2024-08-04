import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react"
import "./tailwind.css"

declare global {
  interface Window {
    ENV: {
      PUBLIC_LUCHY_TOKEN: string
    }
  }
}

export const loader = ({ context }: LoaderFunctionArgs) => {
  return json({
    ENV: {
      PUBLIC_LUCHY_TOKEN: context.cloudflare.env.PUBLIC_LUCHY_TOKEN,
    },
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root")

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needed to pass data to the client
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
