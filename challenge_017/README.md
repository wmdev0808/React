# Multi-page SPA with React Router

- React Router v6
- Migrate from v5 to v6
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
