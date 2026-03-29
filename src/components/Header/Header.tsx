import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-mark" onClick={handleClose}>
          <span className="brand-mark__badge">TE</span>
          <span className="brand-mark__text">
            <strong>Travel Explorer</strong>
            <small>Modern travel inspiration</small>
          </span>
        </Link>

        <nav className="nav-desktop">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/trips">Trips</NavLink>
        </nav>

        <button onClick={handleToggle} className="menu-btn" type="button">
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile">
          <NavLink to="/" onClick={handleClose}>
            Home
          </NavLink>
          <NavLink to="/explore" onClick={handleClose}>
            Explore
          </NavLink>
          <NavLink to="/favorites" onClick={handleClose}>
            Favorites
          </NavLink>
          <NavLink to="/trips" onClick={handleClose}>
            Trips
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
