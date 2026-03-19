import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;