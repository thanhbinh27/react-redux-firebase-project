import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Header() {
  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <div className="header-admin">
      <nav className="navbar">
        <div className="container-fluid">
        <p className="p-admin">ADMINISTRATOR DASHBOARD</p>
          <Navbar variant="dark" bg="dark" expand="lg" className="px-4">
            <Container fluid>
              <Navbar.Toggle aria-controls="navbar-dark-example" />
              <Navbar.Collapse id="navbar-dark-example">
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
                      <Link className="nav-link" to="/">
                        Home Page
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="nav-link" to="/" onClick={logout}>
                        Logout
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </nav>
    </div>
  );
}

export default Header;