import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import { Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../component/Utils";

const Profile = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  
  const goToCheckout = () => {
      navigate("/Checkout")
  }

  var totalCartPrice = 0;
  const {state} = useLocation()
  const cart = useSelector((state) => state.cart);
  const [payload, setPayload] = useState([])
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    submitAddress()
  }, [])

  const goToInvoices = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/orders`, {
      method: "POST", 
      body: JSON.stringify({
        delivery_fee: 10000,
        delivery_address: state.address
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data._id) {
        navigate("/Invoices", {state: {id: data._id}})
      }
    })
  }

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

    {cart.map((item, index) => (
      totalCartPrice += item.price * item.qty
    ))}

    let {count}= useSelector(state => state.counter)
    const dispatch = useDispatch()
  
  return (
    <React.Fragment>
            
        <NavbarComponent />

        {/*---------------------------------------------------------*/}

        <div style={{
            marginTop: "25px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            }}>
        <Card style={{
            width: '70%',
            justifyContent: "center",
            alignItems: "center"
            }}>
        <Card.Header style={{width: "100%", background: "#DC0000", color: "white"}}><strong>Confirm</strong></Card.Header>
        <ListGroup style={{width: "100%"}} variant="flush">
        
            <Row>
                <Col>
                    <ListGroup.Item><strong>Alamat</strong></ListGroup.Item>
                    <ListGroup.Item><strong>Sub Total</strong></ListGroup.Item>
                    <ListGroup.Item><strong>Ongkir</strong></ListGroup.Item>
                    <ListGroup.Item><strong>Total</strong></ListGroup.Item>
                </Col>
                <Col>
                    <ListGroup.Item>{state?.address?.detail}</ListGroup.Item>
                    <ListGroup.Item>Rp.{numberWithCommas(totalCartPrice)}.00</ListGroup.Item>
                    <ListGroup.Item>Rp.10.000.00</ListGroup.Item>
                    <ListGroup.Item><strong>Rp.{numberWithCommas(totalCartPrice+10000)}.00</strong></ListGroup.Item>
                </Col>
            </Row>
            <div style={{justifyContent: "center", alignItems: "center"}}>
            <div style={{float: "left"}}>
            <Button
            onClick={() => goToCheckout()}
            style={{
                width: "100%",
                marginBottom: "5px",
                marginTop: "5px",
                marginLeft: "5px",
                background: "#22668a"
            }}>Kembali</Button>
            </div>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center", float: "right"}}>
            <Button
            onClick={() => goToInvoices()}
            style={{
                width: "100%",
                marginBottom: "5px",
                marginTop: "5px",
                marginRight: "5px",
                paddingLeft: "10px",
                background: "#22668a"
            }}>Bayar</Button>
            </div>
            </div>
        </ListGroup>

        </Card>
        </div>
        
    </React.Fragment>
  );
}

export default Profile;