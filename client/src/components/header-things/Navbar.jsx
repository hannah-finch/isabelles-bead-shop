import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../utils/ProductsContext";
import CartPreview from "../CartPreview";

import Auth from "../../utils/auth";

function Navbar() {
  const { cartCounter, cartItems } = useContext(ShoppingCartContext);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <nav>
      {Auth.isLoggedIn() ? (
        Auth.isAdmin() ? (
          <>
            <NavLink
              to={"/admin"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Admin Panel
            </NavLink>
            <div className="vertical-line"></div>
          </>
        ) : null
      ) : null}
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

      <NavLink
        to={"/cart"}
        className={({ isActive }) =>
          `${isActive ? "active-link" : ""} nav-link`
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        cart
        <div className="cart-num">{cartCounter}</div>
        {isHovered && <CartPreview items={cartItems} />}
      </NavLink>
    </nav>
  );
}

export default Navbar;
