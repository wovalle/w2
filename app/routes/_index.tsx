import { getTracker } from "@luchyio/react"
import type { MetaFunction } from "@remix-run/cloudflare"
import { Link } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ]
}

export default function Index() {
  const luchy = getTracker()

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix on Cloudflare</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <Link
            to="/foo"
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            rel="noreferrer"
          >
            Remix Docs
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              luchy.collectEvent("test_event", { test: "data" })
            }}
            className="text-blue-700 underline visited:text-purple-900"
          >
            Trigger event
          </button>
        </li>
        <li>
          <button
            type="button"
            data-luchy-event="cta-click"
            className="text-blue-700 underline visited:text-purple-900"
          >
            Automatic event
          </button>
        </li>
      </ul>
    </div>
  )
}
