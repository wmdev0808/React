# Next.js

## What is NextJS?

- The React framework for production
  - You still write React code, you still build React components and use React features (props, state, context, ...)
  - NextJS just enhances your React apps and adds more features
  - Lots of built-in features (e.g. routing) that help you solve common problems & clear guidance on how to use those features.
  - There are certain problems which you will need to solve for almost all production-ready React apps: NextJS solves those for you
- A fullstack framework for ReactJS

## NextJS - Key Features & Benefits

- File-based Routing
  - Define pages and routes with files and folders instead of code
  - Less code, less work, highly understandable
- Server-side Rendering
  - Automatic page pre-rendering: Great for SEO and initial load
  - Blending client-side and server-side: Fetch data on the server and render finished pages
- Fullstack Capabilities
  - Easily add backend(server-side) code to your Next/React apps
  - Storing data, getting data, authentication etc. can be added to your React projects

## Agenda

### Routing

- A file-system based router built on the concept of pages.
  ```
  `pages/index.js` → `/`
  `pages/blog/index.js` → `/blog`
  ```
- Dynamic route segments
  To match a dynamic segment, you can use the bracket syntax. This allows you to match named parameters.
  ```
  `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
  `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
  `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)
  ```
- Linking between pages
  A React component called Link is provided to do this client-side route transition.

  ```
  import Link from 'next/link'

  function Home() {
    return (
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
  ```

### Data Fetching

Data fetching in Next.js allows you to render your content in different ways, depending on your application's use case. These include pre-rendering with **Server-side Rendering** or **Static Generation**, and updating or creating content at runtime with **Incremental Static Regeneration**.

#### SSR: Server-side rendering with **getServerSideProps**

- If you export a function called `getServerSideProps` (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by `getServerSideProps`.
  ```
  export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  ```

#### SSG: Static-site generation with **getStaticProps**

- If you export a function called `getStaticProps` (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

```
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

#### CSR: Client-side rendering with **SWR**

- Client-side data fetching is useful when your page doesn't require SEO indexing, when you don't need to pre-render your data, or when the content of your pages needs to update frequently. Unlike the server-side rendering APIs, you can use client-side data fetching at the component level.
- It's important to note that using client-side data fetching can affect the performance of your application and the load speed of your pages. This is because the data fetching is done at the time of the component or pages mount, and the data is not cached.
- Client-side data fetching with `useEffect`
- Client-side data fetching with SWR

  - The team behind Next.js has created a React hook library for data fetching called SWR. It is highly recommended if you are fetching data on the client-side. It handles caching, revalidation, focus tracking, refetching on intervals, and more.

  ```
  import useSWR from 'swr'

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  function Profile() {
    const { data, error } = useSWR('/api/profile-data', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
      <div>
        <h1>{data.name}</h1>
        <p>{data.bio}</p>
      </div>
    )
  }
  ```

#### Dynamic routing with **getStaticPaths**

- If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

- When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

  ```
  // pages/posts/[id].js

  // Generates `/posts/1` and `/posts/2`
  export async function getStaticPaths() {
    return {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: false, // can also be true or 'blocking'
    }
  }

  // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps(context) {
    return {
      // Passed to the page component as props
      props: { post: {} },
    }
  }

  export default function Post({ post }) {
    // Render post...
  }
  ```

  - `fallback` property
    - `fallback: false`
      - If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    - `fallback: true`
      The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path. Web crawlers, such as Google, won't be served a fallback and instead the path will behave as in fallback: 'blocking'.
    - `fallback: 'blocking'`
      If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.

#### ISR: Incremental Static Regeneration

- Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

- To use ISR, add the `revalidate` prop to `getStaticProps`:

  ```
  function Blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    )
  }

  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // revalidation is enabled and a new request comes in
  export async function getStaticProps() {
    const res = await fetch('https://.../posts')
    const posts = await res.json()

    return {
      props: {
        posts,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  }

  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // the path has not been generated.
  export async function getStaticPaths() {
    const res = await fetch('https://.../posts')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
  }

  export default Blog
  ```
