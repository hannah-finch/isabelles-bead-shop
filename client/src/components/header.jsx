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
        <NavLink to={'/cart'} className={({ isActive }) => (isActive ? "active-link" : "")}>
          cart
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