import { NavLink, Link } from "react-router-dom";

import Auth from "../utils/auth";
import auth from "../utils/auth";

function Header() {
  return (
    <>
      <nav>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          shop
        </NavLink>
        {/* these page routes aren't made yet */}
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          about
        </NavLink>
        {/* TODO: put the logged in user's Id in href here */}
        {/* TODO: conditionally renter the account link to only show when logged in. */}
        {/* TODO: when not logged in, show a log in link */}
        {Auth.isLoggedIn() ? (
          Auth.isClient() ? (
            <NavLink
              to={"/account/userId"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              account
            </NavLink>
          ) : null
        ) : null}
        {Auth.isLoggedIn() ? (
          Auth.isAdmin() ? (
            <NavLink
              to={"/admin"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              admin
            </NavLink>
          ) : null
        ) : null}

        <div className="vertical-line"></div>

        {/* TODO: Change cart text to a cart icon */}
        <NavLink
          to={"/cart"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          cart
          {/* TODO: show cart.length here instead of 8 */}
          {/* TODO: cart number should only render if cart.length */}
          <div className="cart-num">8</div>
        </NavLink>

        {/* TODO: TESTING LOGIN/LOGOUT*/}
        {Auth.isLoggedIn() ? (
          <button onClick={Auth.logout}>logout</button>
        ) : (
          <NavLink
            to={"/login"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            login
          </NavLink>
        )}
      </nav>

      <header>
        <Link to="/">
          <h1>Isabelle’s Bead Shop</h1>
          <img src="/images/icon-zigzag.png"></img>
        </Link>
      </header>
    </>
  );
}

export default Header;
