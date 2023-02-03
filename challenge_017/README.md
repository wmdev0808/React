# Multi-page SPA with React Router V6

## Migrate from v5 to v6

- Upgrade all `<Switch>` elements with `<Routes>`
- `<Route children>` from the v5 app changed to `<Route element>`
- `<Redirect>` elements should be replaced with `<Navigate>` element
- `<Route path>` and `<Link to>` are relative
- `<Route exact>`is gone. Instead, routes with descendant routes (defined in other components) use a trailing \* in their path to indicate they match deeply
- Rename `<NavLink exact>` to `<NavLink end>`
- Remove `activeClassName` and `activeStyle` prop from `<NavLink />`
  ```
    <NavLink
      to="/messages"
      className="nav-link"
      activeClassName="activated"
      className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
    >
      Messages
    </NavLink>
  ```
- When using a nested config, routes with `children` should render an `<Outlet>` in order to render their child routes.
- Use `useNavigate` instead of `useHistory`
- `<Prompt>` is not currently supported

## Better Data Fetching with React Router 6.4

# Deployment using Firebase

## Deployment Steps

- Test code
- Optimize code
- Build app for production
- Upload production code to server
- Configure server

## Deployment

### Build for production

- $ npm run build

### Firebase hosting

- Step 1: Install the Firebase CLI
  ```
  $ npm install -g firebase-tools
  ```
- Step 2: Initialize your project
  ```
  $ firebase init hosting
  ```
- Step 3: Deploy to your site
  ```
  $ firebase deploy --only hosting
  ```

### Cancel Firebase hosting

- Step 1: Stops serving Firebase Hosting traffic for the active Firebase project.
  ```
  $ firebase hosting:disable
  ```
- Step 2: Delete hosting deployment in release history of the Firebase project by clicking on Delete context menu item of the release
