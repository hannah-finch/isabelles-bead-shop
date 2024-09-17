import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <nav>
        <NavLink to={'/'} className={({ isActive }) => (isActive ? "active-link" : "")}>
          shop
        </NavLink>
        {/* these page routes aren't made yet */}
        <NavLink to={'/about'} className={({ isActive }) => (isActive ? "active-link" : "")}>
          about
        </NavLink>
        {/* TODO: put the logged in user's Id in href here */}
        {/* TODO: conditionally renter the account link to only show when logged in. */}
        {/* TODO: when not logged in, show a log in link */}
        <NavLink to={'/account/userId'} className={({ isActive }) => (isActive ? "active-link" : "")}>
          account
        </NavLink>
        <div className="vertical-line"></div>

        {/* TODO: Change cart text to a cart icon */}
        <NavLink to={'/cart'} className={({ isActive }) => (isActive ? "active-link" : "")}>
          cart
          {/* TODO: show cart.length here instead of 8 */}
          {/* TODO: cart number should only render if cart.length */}
          <div className="cart-num">8</div>
        </NavLink>
      </nav>

      <header>
        <Link to="/">
          <h1>Isabelle’s Bead Shop</h1>
          <img src='/images/icon-zigzag.png'></img>
        </Link>
      </header>
    </>
  )
}


export default Header