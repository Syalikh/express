import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="/">React x Express</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/tambah" className="nav-link">
              Tambah
            </Link>
            <Outlet />
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;