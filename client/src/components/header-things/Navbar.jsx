import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { ShoppingCartContext } from "../../utils/ProductsContext";
import CartPreview from "../CartPreview";

import Auth from "../../utils/auth";

function Navbar() {
  const { cartCounter, cartItems } = useContext(ShoppingCartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const menu = useRef(null);

  // get the view width to show/hide navbar
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // click off menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menu.current && !menu.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const NavLinks = () => {
    return (
      <>
        {Auth.isLoggedIn() ? (
          Auth.isAdmin() ? (
            <>
              <NavLink
                to={"/admin"}
                className={({ isActive }) =>
                  isActive ? "active-link btn-admin" : "btn-admin"
                }
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
      </>
    );
  };
  return (
    <>
      <nav>
        {showMenu && (
          <div className="menu" ref={menu}>
            <button className="hamburger" onClick={toggleMenu}>
              =
            </button>
            <div className="spacer"></div>
            <NavLinks />

            <img
              style={{
                width: "60px",
                alignSelf: "center",
                position: "absolute",
                bottom: "40px",
              }}
              src="/images/icons/cluster-1.svg"
            ></img>
          </div>
        )}
        <button className="hamburger" onClick={toggleMenu}>
          =
        </button>

        {width > 700 ? <NavLinks /> : <></>}

        <NavLink
          to={"/cart"}
          className={({ isActive }) =>
            `${isActive ? "active-link" : ""} nav-link`
          }
          onMouseEnter={
            width > 700 ? () => setIsHovered(true) : () => setIsHovered(false)
          }
          onMouseLeave={() => setIsHovered(false)}
        >
          cart
          <div className="cart-num">{cartCounter}</div>
          {isHovered && <CartPreview items={cartItems} />}
        </NavLink>
      </nav>
      {/* <div className="menu">
        <NavLinks />
      </div> */}
    </>
  );
}

export default Navbar;
