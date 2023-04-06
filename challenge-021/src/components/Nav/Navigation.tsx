import { NavLink } from "react-router-dom";

import "./Navigation.css";

function Navigation() {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              end
              to="/"
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
