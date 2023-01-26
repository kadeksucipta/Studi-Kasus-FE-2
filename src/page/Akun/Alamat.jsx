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
import { Col, ListGroup, Row } from "react-bootstrap";

const Alamat = () => {
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
  const goToTambahAlamat = () => {
    navigate("/TambahAlamat")
  }

  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })
  const [payload, setPayload] = useState([])

  useEffect(() => {
    submitAddress()
  }, [])

  const submitAddress = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/delivery-addresses`, {
      method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
      setPayload(data.data)
      console.log(data);
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
                <Nav.Link onClick={() => goToProfile()}>Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToAlamat()}  href="#first">Alamat</Nav.Link>
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
            <Card.Title>Alamat</Card.Title>
            <hr style={{width: "10%"}} />
            <ListGroup style={{width: "100%"}} variant="flush">
              {payload.map((item, index) => (
                <Row key={index}>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Nama</strong></ListGroup.Item>
                        <ListGroup.Item>{item.nama}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Provinsi</strong></ListGroup.Item>
                        <ListGroup.Item>{item.provinsi}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Kabupaten</strong></ListGroup.Item>
                        <ListGroup.Item>{item.kabupaten}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Kecamatan</strong></ListGroup.Item>
                        <ListGroup.Item>{item.kecamatan}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Kelurahan</strong></ListGroup.Item>
                        <ListGroup.Item>{item.kelurahan}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Detail</strong></ListGroup.Item>
                        <ListGroup.Item>{item.detail}</ListGroup.Item>
                    </Col>
                </Row>
                ))}
            </ListGroup>
            <br />
            <Button onClick={() => goToTambahAlamat()} style={{background: "#22668a"}}>Tambah Alamat</Button>
          </Card.Body>
        </Card>
        
    </React.Fragment>
  );
}

export default Alamat;