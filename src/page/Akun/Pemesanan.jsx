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
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavbarComponent from "../../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Col, ListGroup, Row } from "react-bootstrap";

const Pemesanan = () => {
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

  const {state} = useLocation()
  const [payload, setPayload] = useState([])
  const [invoice, setIvoice] = useState({})
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    fetchProfile()
    fetchOrder()
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

  const fetchOrder = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/orders`, {
      method: "GET", 
      // body: JSON.stringify({
      //   delivery_fee: 10000,
      //   delivery_address: payload[0]
      // }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("order:", data);
      if (data._id) {
        navigate("/Invoices", {state: {id: data._id}})
      }
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
                <Nav.Link onClick={() => goToAlamat()}>Alamat</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToPemesanan()}  href="#first">Pemesanan</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToLogout()}>Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Pemesanan</Card.Title>
            <hr style={{width: "10%"}} />
            <ListGroup style={{width: "100%"}} variant="flush">
            
                <Row>
                    <Col>
                        <ListGroup.Item><strong>Order ID</strong></ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item><strong>Total</strong></ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item><strong>Status</strong></ListGroup.Item>
                        <ListGroup.Item>{invoice?.order?.status}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item><strong>Invoices</strong></ListGroup.Item>
                        <ListGroup.Item><Button size="sm" variant="danger">Invoices</Button></ListGroup.Item>
                    </Col>
                </Row>

            </ListGroup>
          </Card.Body>
        </Card>
        
    </React.Fragment>
  );
}

export default Pemesanan;