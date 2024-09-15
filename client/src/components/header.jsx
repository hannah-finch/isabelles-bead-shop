import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        {/* these page routes aren't made yet */}
        <NavLink to={'/about'} className={({ isActive }) => (isActive ? "active-link" : "")}>
          about
        </NavLink>
        <NavLink to={'/account'} className={({ isActive }) => (isActive ? "active-link" : "")}>
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
      <div className="logo-container">
        <h1>Isabelle&apos;s Bead Shop</h1>
        <img></img>
      </div>
    </header>

  )
}


export default Header