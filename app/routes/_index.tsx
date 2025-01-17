import { getTracker } from "@luchyio/react"
import type { MetaFunction } from "@remix-run/cloudflare"
import { Link, json, useLoaderData } from "@remix-run/react"
import { getPosts } from "../.server/posts"
import { Post } from "../components/post"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ]
}

export const loader = async () => {
  const posts = await getPosts()

  return json({
    featuredPosts: posts.filter((post) => post.frontmatter.featured),
  })
}

export default function Index() {
  const luchy = getTracker()
  const { featuredPosts } = useLoaderData<typeof loader>()

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix on Cloudflare</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <Link
            to="/foo"
            className="text-blue-700 underline visited:text-purple-900"
          >
            Foo link
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

      <section>
        <h3 className="text-xl tracking-wide">✨ FEATURED ✨</h3>
        <ul className="mt-4 space-y-8">
          {featuredPosts.map((post) => (
            <li key={post.slug}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
