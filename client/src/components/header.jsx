import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../utils/ProductsContext";

import Auth from "../utils/auth";

function Header() {
  const { cartCounter } = useContext(ShoppingCartContext);

  return (
    <>
      <nav>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          shop
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          about
        </NavLink>

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

        <div className="vertical-line"></div>

        {/* TODO: Change cart text to a cart icon */}
        <NavLink
          to={"/cart"}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          cart
          {/* TODO: show cart.length here instead of 8 */}
          {/* TODO: cart number should only render if cart.length */}
          <div className="cart-num">{ cartCounter }</div>
        </NavLink>
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
