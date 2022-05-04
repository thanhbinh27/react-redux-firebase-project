import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartItems");
    window.location.reload();
  };

  return (
    <div>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand mx-5" to="/">
              THANH BINH
            </Link>
            <Navbar variant="dark" bg="dark" expand="lg" className="px-4">
              <Container fluid className="header-container">
                <img
                  className="p-2"
                  width="100"
                  height="50"
                  alt=""
                  src="https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-da84e26/wp-content/uploads/2021/08/Logo-AppleAuthorised.svg"
                />
                <div className="p-2">
                  <img
                    alt=""
                    width="18"
                    height="19"
                    src="https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-da84e26/wp-content/uploads/2021/09/toppng.com-telephone-symbol-white-white-contact-icon-1776x1890-1-282x300.png"
                  />
                  <a href="tel: 19008888">19008888</a>
                </div>
                <div className="p-1">
                  <img
                    alt=""
                    width="15"
                    height="20"
                    src="https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-da84e26/wp-content/uploads/2021/08/pngfind.com-address-icon-png-807569-188x300.png"
                  />
                  <a href="/">Address</a>
                </div>
              </Container>
            </Navbar>
          </div>
        </nav>
      </div>

      <div className="nav-menu">
        <Navbar bg="light" expand="lg" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                alt=""
                width="80px"
                height="50px"
                src="https://i.pinimg.com/564x/0f/c5/cb/0fc5cb2029b3218e231ac0df1e4937f5.jpg"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="me-auto my-5 my-lg-0 nav-menu-item"
                // style={{ maxHeight: "100px" }}
                // navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="#">About Us</Nav.Link>
                <Nav.Link href="#">Support</Nav.Link>
                <Nav.Link href="#">Contact</Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={
                    <>
                      <FaUser />{" "}
                      {user.email.substring(0, user.email.length - 10)}
                    </>
                  }
                  menuVariant="dark"
                >
                  <NavDropdown.Item>
                    <Link className="nav-link" to="/orders">
                      Your Orders
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="nav-link" to="/" onClick={logout}>
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Link className="nav-link" to="/cart">
                <FaCartPlus /> {cartItems.length}{" "}
              </Link>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
