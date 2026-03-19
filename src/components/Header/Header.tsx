import { Link } from "react-router-dom";

function Header() {
  return (
    <header >
      <h1>Travel Explorer</h1>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/trips">Trips</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;