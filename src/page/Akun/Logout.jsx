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

const Logout = () => {
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
  const goToLogin = () => {
    navigate("/")
  }

  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = (formData) => {
    fetch(`http://localhost:8000/auth/me`,
        {
        method: "GET",
        body: formData,
        headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZmYyZGQ3NWY1ZDc1NmU3MjFiZmYiLCJmdWxsX25hbWUiOiJLYWRlayBTdWNpcHRhIiwiZW1haWwiOiJrYWRla0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjdXN0b21lcl9pZCI6OSwiaWF0IjoxNjcwOTk0NzkyfQ.SR3QSv5msez833UDgbOdnWwIQWhtonKyBDC38Iun0Jo`}
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

        {/* <Card className="mt-5">
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link onClick={() => goToProfile()}>Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToAlamat()}>Alamat</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToPemesanan()}>Pemesanan</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToLogout()} href="#first">Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Log Out</Card.Title>
            <hr style={{width: "10%"}} />
            <Card.Text>Anda Yakin Ingin Keluar ?</Card.Text>
            <Button variant="primary">TIDAK</Button>{" "}
            <Button onClick={() => goToLogin()} variant="primary">YA</Button>
          </Card.Body>
        </Card> */}

      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
      <Modal.Dialog>
        <Modal.Header onClick={() => goToProfile()} closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Anda yakin ingin Logout.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => goToProfile()} style={{background: "#22668a"}}>Tidak</Button>
          <Button onClick={() => goToLogin()} variant="danger">Ya</Button>
        </Modal.Footer>
      </Modal.Dialog>
      </div>
        
    </React.Fragment>
  );
}

export default Logout;