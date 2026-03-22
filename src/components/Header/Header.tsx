import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleToggle = () => {    setMenuOpen(!menuOpen);
  };
  const handleClose = () => {    setMenuOpen(false);
  };
  return (
    <header >
      <div className="header-inner">
        <Link to="/">Logo</Link>

      <nav className="nav-desktop">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/trips">Trips</Link>
      </nav>

      <button onClick={handleToggle} className="menu-btn">Menu</button>
      </div>


      {menuOpen && (
        <div className="nav-mobile">
          <Link to="/" onClick={handleClose}>
            Home
          </Link>
          <Link to="/explore" onClick={handleClose}>
            Explore
          </Link>
          <Link to="/favorites" onClick={handleClose}>
            Favorites
          </Link>
          <Link to="/trips" onClick={handleClose}>
            Trips
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;