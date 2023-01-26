import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComponent from "../../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../../component/Utils";

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
  const goToInvoices = (id) => {
    navigate("/Invoices", {state:{id}})
  }

  const {state} = useLocation()
  const [order, setOrder] = useState([])
  const [invoice, setIvoice] = useState({})
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    // fetchProfile()
    fetchOrder()
  }, [])

  // const fetchProfile = (formData) => {
  //   fetch(`http://localhost:8000/auth/me`,
  //       {
  //       method: "GET",
  //       body: formData,
  //       headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZmYyZGQ3NWY1ZDc1NmU3MjFiZmYiLCJmdWxsX25hbWUiOiJLYWRlayBTdWNpcHRhIiwiZW1haWwiOiJrYWRla0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjdXN0b21lcl9pZCI6OSwiaWF0IjoxNjcwOTk0NzkyfQ.SR3QSv5msez833UDgbOdnWwIQWhtonKyBDC38Iun0Jo`}
  //       }
  //   )
  //   .then(res => res.json())
  //   .then(data => {
  //     setProfile(data)
  //       console.log(data)
  //   })
  // }

  const fetchOrder = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setOrder(data.data)
      console.log("order:", data);
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
            {order.map((item, index) => (
                <Row key={index}>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Order ID</strong></ListGroup.Item>
                        <ListGroup.Item>{item._id}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Total</strong></ListGroup.Item>
                        <ListGroup.Item>Rp.{numberWithCommas(item.total)}.00</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Status</strong></ListGroup.Item>
                        <ListGroup.Item>{item.status}</ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item style={{background: "#eeeeee"}}><strong>Invoices</strong></ListGroup.Item>
                        <ListGroup.Item><Button size="sm" variant="danger" onClick={() => goToInvoices(item._id)}>Invoices</Button></ListGroup.Item>
                    </Col>
                </Row>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
        
    </React.Fragment>
  );
}

export default Pemesanan;