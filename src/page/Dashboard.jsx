import React from "react";
import NavbarComponent from "../component/NavbarComponent";
import "./Dashboard.css";
import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("./Login")
  }

  return (
    <React.Fragment>
      <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
          >
            <strong>Slebew</strong>Mart
          </Navbar.Brand>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
          >
            <strong>|</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1"></Nav.Link>
              
            <Nav.Link href="#first"><strong>Home</strong></Nav.Link>
            <Nav.Link href="#first"><strong>About</strong></Nav.Link>
            <Nav.Link onClick={() => goToLogin()}><strong>Login</strong></Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button
                style={{ background: "white", color: "#22668a" }}
                className="btn-search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default Dashboard;
