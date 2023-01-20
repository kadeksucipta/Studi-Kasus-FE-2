import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; 
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavbarComponent from "../../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Modal } from "react-bootstrap";
import foto from "./KADEK (liquif).jpg"

const Profile = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  const goToPemesanan = () => {
      navigate("/Pemesanan")
  }
  const goToAlamat = () => {
      navigate("/Alamat")
  }
  const goToLogout = () => {
    navigate("/Logout")
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/auth/me`,
        {
        method: "GET",
        body: formData,
        headers: {Authorization : `Bearer ${token}`}
        }
    )
    .then(res => res.json())
    .then(data => {
      setProfile(data)
        console.log(data)
    })
  }
  
  return (
    <React.Fragment>
            
        <NavbarComponent />

        {/*---------------------------------------------------------*/}

        <Card className="mt-5">
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link onClick={() => goToProfile()} href="#first">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToAlamat()}>Alamat</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToPemesanan()}>Pemesanan</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToLogout()}>Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <hr style={{width: "10%"}} />
            <Card.Text>Name: {profile.full_name}</Card.Text>
            <Card.Text>Email: {profile.email}</Card.Text>

            <Button variant="primary" onClick={handleShow}>
            Detail Profile
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Detail Profile</Modal.Title>
            </Modal.Header>
            <div className="d-flex">
              <img style={{marginLeft: "20px", marginTop: "10px", marginBottom: "10px", width: "100px", borderRadius: "60px"}} src={foto} alt="" />
              <Modal.Body><strong>Kadek Sucipta</strong><p>kadek@gmail.com</p><hr />User</Modal.Body>
            </div>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          </Card.Body>
        </Card>
        
    </React.Fragment>
  );
}

export default Profile;