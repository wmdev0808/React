# React Router 6.4 or later

## Routers

### Picking a Router

#### Using v6.4 Data APIs

- In v6.4, new routers were introduced that support the new data APIs:

  - `createBrowserRouter`
  - `createMemoryRouter`
  - `createHashRouter`

- The easiest way to quickly update to a v6.4 is to get the help from `createRoutesFromElements` so you don't need to convert your `<Route>` elements to route objects.

### createBrowserRouter

- This is the recommended router for all React Router web projects. It uses the DOM History API to update the URL and manage the history stack.

- It also enables the v6.4 data APIs like `loaders`, `actions`, `fetchers` and more.

### createHashRouter

- This router is useful if you are unable to configure your web server to direct all traffic to your React Router application. Instead of using normal URLs, it will use the hash (#) portion of the URL to manage the "application URL".

### createMemoryRouter

Instead of using the browsers history a memory router manages it's own history stack in memory. It's primarily useful for testing and component development tools like Storybook, but can also be used for running React Router in any non-browser environment.

### <RouterProvider>

- All router objects are passed to this component to render your app and enable the rest of the APIs.

## Route

### Route

- Routes are perhaps the most important part of a React Router app. They couple URL segments to components, data loading and data mutations. Through route nesting, complex application layouts and data dependencies become simple and declarative.

- Routes are objects passed to the router creation functions:

  ```js
  const router = createBrowserRouter([
    {
      // it renders this element
      element: <Team />,

      // when the URL matches this segment
      path: "teams/:teamId",

      // with this data loaded before rendering
      loader: async ({ request, params }) => {
        return fetch(`/fake/api/teams/${params.teamId}.json`, {
          signal: request.signal,
        });
      },

      // performing this mutation when data is submitted to it
      action: async ({ request }) => {
        return updateFakeTeam(await request.formData());
      },

      // and renders this element in case something went wrong
      errorElement: <ErrorBoundary />,
    },
  ]);
  ```

- You can also declare your routes with JSX and `createRoutesFromElements`, the props to the element are identical to the properties of the route objects:

  ```js
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<Team />}
        path="teams/:teamId"
        loader={async ({ params }) => {
          return fetch(`/fake/api/teams/${params.teamId}.json`);
        }}
        action={async ({ request }) => {
          return updateFakeTeam(await request.formData());
        }}
        errorElement={<ErrorBoundary />}
      />
    )
  );
  ```

### action

- Route actions are the "writes" to route loader "reads".

  ```js
  <Route
    path="/song/:songId/edit"
    element={<EditSong />}
    action={async ({ params, request }) => {
      let formData = await request.formData();
      return fakeUpdateSong(params.songId, formData);
    }}
    loader={({ params }) => {
      return fakeGetSong(params.songId);
    }}
  />
  ```

- Actions are called whenever the app sends a non-get submission ("post", "put", "patch", "delete") to your route. This can happen in a few ways:

  ```js
  // forms
  <Form method="post" action="/songs" />;
  <fetcher.Form method="put" action="/songs/123/edit" />;

  // imperative submissions
  let submit = useSubmit();
  submit(data, {
    method: "delete",
    action: "/songs/123",
  });
  fetcher.submit(data, {
    method: "patch",
    action: "/songs/123/edit",
  });
  ```

### errorElement

- When exceptions are thrown in loaders, actions, or component rendering, instead of the normal render path for your Routes (`<Route element>`), the error path will be rendered (`<Route errorElement>`) and the error made available with `useRouteError`.

### loader

- Each route can define a "loader" function to provide data to the route element before it renders.

### shouldRevalidate

- This function allows you opt-out of revalidation for a route's loader as an optimization.

- If you define shouldRevalidate on a route, it will first check the function before calling the route loader for new data. If the function returns false, then the loader will not be called and the existing data for that loader will persist on the page.

  ```js
  <Route
    path="meals-plans"
    element={<MealPlans />}
    loader={loadMealPlans}
    shouldRevalidate={({ currentUrl }) => {
      // only revalidate if the submission originates from
      // the `/meal-plans/new` route.
      return currentUrl.pathname === "/meal-plans/new";
    }}
  >
    <Route
      path="new"
      element={<NewMealPlanForm />}
      // `loadMealPlans` will be revalidated after
      // this action...
      action={createMealPlan}
    />
    <Route
      path=":planId/meal"
      element={<Meal />}
      // ...but not this one because origin the URL
      // is not "/meal-plans/new"
      action={updateMeal}
    />
  </Route>
  ```

## Components

### Await

- Used to render deferred values with automatic error handling. Make sure to review the Deferred Data Guide since there are a few APIs that work together with this component.

  ```js
  import { Await, useLoaderData } from "react-router-dom";

  function Book() {
    const { book, reviews } = useLoaderData();
    return (
      <div>
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <React.Suspense fallback={<ReviewsSkeleton />}>
          <Await
            resolve={reviews}
            errorElement={<div>Could not load reviews �</div>}
            children={(resolvedReviews) => <Reviews items={resolvedReviews} />}
          />
        </React.Suspense>
      </div>
    );
  }
  ```

### Form

- The Form component is a wrapper around a plain HTML form that emulates the browser for client side routing and data mutations. It is not a form validation/state management library like you might be used to in the React ecosystem (for that, we recommend the browser's built in HTML Form Validation and data validation on your backend server).

  ```js
  import { Form } from "react-router-dom";

  function NewEvent() {
    return (
      <Form method="post" action="/events">
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button type="submit">Create</button>
      </Form>
    );
  }
  ```

### ScrollRestoration

- This component will emulate the browser's scroll restoration on location changes after loaders have completed to ensure the scroll position is restored to the right spot, even across domains.

- You should only render one of these and it's recommended you render it in the root route of your app:

  ```js
  import { ScrollRestoration } from "react-router-dom";

  function RootRouteComponent() {
    return (
      <div>
        {/* ... */}
        <ScrollRestoration />
      </div>
    );
  }
  ```

## Hooks

### useActionData

- This hook provides the returned value from the previous navigation's action result, or undefined if there was no submission.

- The most common use-case for this hook is form validation errors. If the form isn't right, you can return the errors and let the user try again:

  ```js
  import { useActionData, Form, redirect } from "react-router-dom";

  export default function SignUp() {
    const errors = useActionData();

    return (
      <Form method="post">
        <p>
          <input type="text" name="email" />
          {errors?.email && <span>{errors.email}</span>}
        </p>

        <p>
          <input type="text" name="password" />
          {errors?.password && <span>{errors.password}</span>}
        </p>

        <p>
          <button type="submit">Sign up</button>
        </p>
      </Form>
    );
  }

  export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const errors = {};

    // validate the fields
    if (typeof email !== "string" || !email.includes("@")) {
      errors.email = "That doesn't look like an email address";
    }

    if (typeof password !== "string" || password.length < 6) {
      errors.password = "Password must be > 6 characters";
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
      return errors;
    }

    // otherwise create the user and redirect
    await createUser(email, password);
    return redirect("/dashboard");
  }
  ```

### useAsyncError

- Returns the rejection value from the nearest [`<Await>`][await] component.

  ```js
  import { useAsyncError, Await } from "react-router-dom";

  function ErrorElement() {
    const error = useAsyncError();
    return <p>Uh Oh, something went wrong! {error.message}</p>;
  }

  <Await resolve={promiseThatRejects} errorElement={<ErrorElement />} />;
  ```

### useAsyncValue

- Returns the resolved data from the nearest `<Await>` ancestor component.

  ```js
  function ProductVariants() {
    const variants = useAsyncValue();
    return <div>{/* ... */}</div>;
  }

  // Await creates the context for the value
  <Await resolve={somePromiseForProductVariants}>
    <ProductVariants />
  </Await>;
  ```

### useBeforeUnload

- This hook is just a helper around window.onbeforeunload. It can be useful to save important application state on the page (to something like the browser's local storage), before the user navigates away from your page. That way if they come back you can restore any stateful information (restore form input values, etc.)

  ```js
  import { useBeforeUnload } from "react-router-dom";

  function SomeForm() {
    const [state, setState] = React.useState(null);

    // save it off before users navigate away
    useBeforeUnload(
      React.useCallback(() => {
        localStorage.stuff = state;
      }, [state])
    );

    // read it in when they return
    React.useEffect(() => {
      if (state === null && localStorage.stuff != null) {
        setState(localStorage.stuff);
      }
    }, [state]);

    return <>{/*... */}</>;
  }
  ```

### useFetcher

- In HTML/HTTP, data mutations and loads are modeled with navigation: `<a href>` and `<form action>`. Both cause a navigation in the browser. The React Router equivalents are `<Link>` and `<Form>`.

- But sometimes you want to call a loader outside of navigation, or call an action (and get the data on the page to revalidate) without changing the URL. Or you need to have multiple mutations in-flight at the same time.

- Many interactions with the server aren't navigation events. This hook lets you plug your UI into your actions and loaders without navigating.

- This is useful when you need to:

  - fetch data not associated with UI routes (popovers, dynamic forms, etc.)
  - submit data to actions without navigating (shared components like a newsletter sign ups)
  - handle multiple concurrent submissions in a list (typical "todo app" list where you can click multiple buttons and all should be pending at the same time)
  - infinite scroll containers
  - and more!

- If you're building a highly interactive, "app like" user interface, you will useFetcher often.

  ```js
  import { useFetcher } from "react-router-dom";

  function SomeComponent() {
    const fetcher = useFetcher();

    // call submit or load in a useEffect
    React.useEffect(() => {
      fetcher.submit(data, options);
      fetcher.load(href);
    }, [fetcher]);

    // build your UI with these properties
    fetcher.state;
    fetcher.formData;
    fetcher.formMethod;
    fetcher.formAction;
    fetcher.data;

    // render a form that doesn't cause navigation
    return <fetcher.Form />;
  }
  ```

### useFetchers

- Returns an array of all inflight fetchers without their load, submit, or Form properties (can't have parent components trying to control the behavior of their children! We know from IRL experience that this is a fool's errand.)

### useFormAction

- This hook is used internally in `<Form>` to automatically resolve default and relative actions to the current route in context. While uncommon, you can use it directly to do things like compute the correct action for a `<button formAction>` to change the action of the button's `<Form>`. (Yes, HTML buttons can change the action of their form!)

  ```js
  import { useFormAction } from "react-router-dom";

  function DeleteButton() {
    return (
      <button formAction={useFormAction("destroy")} formMethod="post">
        Delete
      </button>
    );
  }
  ```

### useLoaderData

- This hook provides the value returned from your route loader.

  ```js
  import {
    createBrowserRouter,
    RouterProvider,
    useLoaderData,
  } from "react-router-dom";

  function loader() {
    return fetchFakeAlbums();
  }

  export function Albums() {
    const albums = useLoaderData();
    // ...
  }

  const router = createBrowserRouter([
    {
      path: "/",
      loader: loader,
      element: <Albums />,
    },
  ]);

  ReactDOM.createRoot(el).render(<RouterProvider router={router} />);
  ```

### useNavigation

- This hook tells you everything you need to know about a page navigation to build pending navigation indicators and optimistic UI on data mutations. Things like:

  - Global loading indicators
  - Disabling forms while a mutation is happening
  - Adding busy indicators to submit buttons
  - Optimistically showing a new record while it's being created on the server
  - Optimistically showing the new state of a record while it's being updated

  ```js
  import { useNavigation } from "react-router-dom";

  function SomeComponent() {
    const navigation = useNavigation();
    navigation.state;
    navigation.location;
    navigation.formData;
    navigation.formAction;
    navigation.formMethod;
  }
  ```

- `navigation.state`

  - `idle` - There is no navigation pending.
  - `submitting` - A route action is being called due to a form submission using POST, PUT, PATCH, or DELETE
  - `loading` - The loaders for the next routes are being called to render the next page

- Normal navigations and GET form submissions transition through these states:

  ```
  idle → loading → idle
  ```

- Form submissions with POST, PUT, PATCH, or DELETE transition through these states:

  ```
  idle → submitting → loading → idle
  ```

- Here's a simple submit button that changes its text when the navigation state is changing:

  ```js
  function SubmitButton() {
    const navigation = useNavigation();

    const text =
      navigation.state === "submitting"
        ? "Saving..."
        : navigation.state === "loading"
        ? "Saved!"
        : "Go";

    return <button type="submit">{text}</button>;
  }
  ```

### useRouteError

- Inside of an `errorElement`, this hook returns anything thrown during an action, loader, or rendering. Note that thrown responses have special treatment, see `isRouteErrorResponse` for more information.

  ```js
  function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return <div>{error.message}</div>;
  }

  <Route
    errorElement={<ErrorBoundary />}
    loader={() => {
      // unexpected errors in loaders/actions
      something.that.breaks();
    }}
    action={() => {
      // stuff you throw on purpose in loaders/actions
      throw new Response("Bad Request", { status: 400 });
    }}
    element={
      // and errors thrown while rendering
      <div>{breaks.while.rendering}</div>
    }
  />;
  ```

### useSubmit

- The imperative version of `<Form>` that let's you, the programmer, submit a form instead of the user.

- For example, submitting the form every time a value changes inside the form:

  ```js
  import { useSubmit, Form } from "react-router-dom";

  function SearchField() {
    let submit = useSubmit();
    return (
      <Form
        onChange={(event) => {
          submit(event.currentTarget);
        }}
      >
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </Form>
    );
  }
  ```

- This can also be useful if you'd like to automatically sign someone out of your website after a period of inactivity. In this case, we've defined inactivity as the user hasn't navigated to any other pages after 5 minutes.

  ```js
  import { useSubmit, useLocation } from "react-router-dom";
  import { useEffect } from "react";

  function AdminPage() {
    useSessionTimeout();
    return <div>{/* ... */}</div>;
  }

  function useSessionTimeout() {
    const submit = useSubmit();
    const location = useLocation();

    useEffect(() => {
      const timer = setTimeout(() => {
        submit(null, { method: "post", action: "/logout" });
      }, 5 * 60_000);

      return () => clearTimeout(timer);
    }, [submit, location]);
  }
  ```

## Fetch Utilities

### json

- A shortcut for:

  ```js
  new Response(JSON.stringify(someValue), {
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
  ```

- Typically used in loaders:

  ```js
  import { json } from "react-router-dom";

  const loader = async () => {
    const data = getSomeData();
    return json(data);
  };
  ```

### redirect

- Because you can return or throw responses in loaders and actions, you can use redirect to redirect to another route.

  ```js
  import { redirect } from "react-router-dom";

  const loader = async () => {
    const user = await getUser();
    if (!user) {
      return redirect("/login");
    }
  };
  ```

- It's really just a shortcut for this:

  ```js
  new Response("", {
    status: 302,
    headers: {
      Location: someUrl,
    },
  });
  ```

- It's recommended to use `redirect` in loaders and actions rather than `useNavigate` in your components when the redirect is in response to data.

## Utilities

### defer

- This utility allows you to defer values returned from loaders by passing promises instead of resolved values.

  ```js
  function loader() {
    let product = await getProduct();
    let reviews = getProductReviews();
    return defer({ product, reviews });
  }
  ```

### isRouteErrorResponse

- This returns `true` if a `route error` is a _route error response_.

  ```js
  import { isRouteErrorResponse } from "react-router-dom";

  function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
      return (
        <div>
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </div>
      );
    } else {
      return <div>Oops</div>;
    }
  }
  ```

- When a response is thrown from an action or loader, it will be unwrapped into an `ErrorResponse` so that your component doesn't have to deal with the complexity of unwrapping it (which would require React state and effects to deal with the promise returned from `res.json()`)

  ```js
  import { json } from "react-router-dom";

  <Route
    errorElement={<ErrorBoundary />}
    action={() => {
      throw json({ message: "email is required" }, { status: 400 });
    }}
  />;

  function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
      error.status; // 400
      error.data; // { "message: "email is required" }
    }
  }
  ```

## Guides

### Deferred Data

- The problem

  - Imagine a scenario where one of your routes' loaders needs to retrieve some data that for one reason or another is quite slow. For example, let's say you're showing the user the location of a package that's being delivered to their home:

    ```js
    import { json, useLoaderData } from "react-router-dom";
    import { getPackageLocation } from "./api/packages";

    async function loader({ params }) {
      const packageLocation = await getPackageLocation(params.packageId);

      return json({ packageLocation });
    }

    function PackageRoute() {
      const data = useLoaderData();
      const { packageLocation } = data;

      return (
        <main>
          <h1>Let's locate your package</h1>
          <p>
            Your package is at {packageLocation.latitude} lat and{" "}
            {packageLocation.longitude} long.
          </p>
        </main>
      );
    }
    ```

  - We'll assume that getPackageLocation is slow. This will lead to initial page load times and transitions to that route to take as long as the slowest bit of data. There are a few things you can do to optimize this and improve the user experience:

    - Speed up the slow thing (😅).
    - Parallelize data loading with Promise.all (we have nothing to parallelize in our example, but it might help a bit in other situations).
    - Add a global transition spinner (helps a bit with UX).
    - Add a localized skeleton UI (helps a bit with UX).

  - If these approaches don't work well, then you may feel forced to move the slow data out of the `loader` into a component fetch (and show a skeleton fallback UI while loading). In this case you'd render the fallback UI on mount and fire off the fetch for the data. This is actually not so terrible from a DX standpoint thanks to `useFetcher`. And from a UX standpoint this improves the loading experience for both client-side transitions as well as initial page load. So it does seem to solve the problem.

  - But it's still sub optimal in most cases (especially if you're code-splitting route components) for two reasons:

    - 1. Client-side fetching puts your data request on a waterfall: document -> JavaScript -> Lazy Loaded Route -> data fetch
    - 2. Your code can't easily switch between component fetching and route fetching (more on this later).

- The solution

  - React Router takes advantage of React 18's Suspense for data fetching using the `defer` Response utility and `<Await />` component / `useAsyncValue` hook. By using these APIs, you can solve both of these problems:

    - 1. Your data is no longer on a waterfall: document -> JavaScript -> Lazy Loaded Route & data (in parallel)
    - 2. Your can easily switch between rendering the fallback and waiting for the data

- Using `defer`

  - Start by adding `<Await />` for your slow data requests where you'd rather render a fallback UI. Let's do that for our example above:

    ```js
    import { Await, defer, useLoaderData } from "react-router-dom";
    import { getPackageLocation } from "./api/packages";

    async function loader({ params }) {
      const packageLocationPromise = getPackageLocation(params.packageId);

      return defer({
        packageLocation: packageLocationPromise,
      });
    }

    export default function PackageRoute() {
      const data = useLoaderData();

      return (
        <main>
          <h1>Let's locate your package</h1>
          <React.Suspense fallback={<p>Loading package location...</p>}>
            <Await
              resolve={data.packageLocation}
              errorElement={<p>Error loading package location!</p>}
            >
              {(packageLocation) => (
                <p>
                  Your package is at {packageLocation.latitude} lat and{" "}
                  {packageLocation.longitude} long.
                </p>
              )}
            </Await>
          </React.Suspense>
        </main>
      );
    }
    ```

  - Alternatively, you can use the `useAsyncValue` hook:

    ```js
    export default function PackageRoute() {
      const data = useLoaderData();

      return (
        <main>
          <h1>Let's locate your package</h1>
          <React.Suspense fallback={<p>Loading package location...</p>}>
            <Await
              resolve={data.packageLocation}
              errorElement={<p>Error loading package location!</p>}
            >
              <PackageLocation />
            </Await>
          </React.Suspense>
        </main>
      );
    }

    function PackageLocation() {
      const packageLocation = useAsyncValue();
      return (
        <p>
          Your package is at {packageLocation.latitude} lat and{" "}
          {packageLocation.longitude} long.
        </p>
      );
    }
    ```

### Working With FormData

- A common trick is to turn the entire formData into an object with `Object.fromEntries`:

  ```js
  const data = Object.fromEntries(await request.formData());
  data.songTitle;
  data.lyrics;
  ```

### Index Query Param

- You may find a wild `?index` appear in the URL of your app when submitting forms.

- Because of nested routes, multiple routes in your route hierarchy can match the URL. Unlike navigations where all matching route loaders are called to build up the UI, when a form is submitted _only one action_ is called.

- Because index routes share the same URL as their parent, the `?index` param lets you disambiguate between the two.

- For example, consider the following router and forms:

  ```js
  createBrowserRouter([
    {
      path: "/projects",
      element: <ProjectsLayout />,
      action: ProjectsLayout.action,
      children: [
        {
          index: true,
          element: <ProjectsIndex />,
          action: ProjectsPage.action,
        },
      ],
    },
  ]);

  <Form method="post" action="/projects" />;
  <Form method="post" action="/projects?index" />;
  ```

- The `?index` param will submit to the index route, the action without the index param will submit to the parent route.

- When a `<Form>` is rendered in an index route without an action, the `?index` param will automatically be appended so that the form posts to the index route. The following form, when submitted, will post to `/projects?index` because it is rendered in the context of the projects index route:

  ```js
  function ProjectsIndex() {
    return <Form method="post" />;
  }
  ```

- If you moved the code to the `ProjectsLayout` route, it would instead post to `/projects`.

- This applies to `<Form>` and all of its cousins:

  ```js
  let submit = useSubmit();
  submit({}, { action: "/projects" });
  submit({}, { action: "/projects?index" });

  let fetcher = useFetcher();
  fetcher.submit({}, { action: "/projects" });
  fetcher.submit({}, { action: "/projects?index" });
  <fetcher.Form action="/projects" />;
  <fetcher.Form action="/projects?index" />;
  <fetcher.Form />; // defaults to the route in context
  ```
