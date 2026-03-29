import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <div className="site-shell">
      <Header />
      <Container>
        <main className="page-shell">
          <div key={location.pathname} className="page-transition">
            <Outlet />
          </div>
        </main>
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
