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
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../component/Utils";
import {  decrementWitchCheckingAction, increment } from "../App/features/Counter/actions"

const Profile = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  
  const goToCheckout = () => {
      navigate("/Checkout")
  }

  var totalCartPrice = 0;
  const cart = useSelector((state) => state.cart);
  const [payload, setPayload] = useState([])
  // const [cart, setCart] = useState([])
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    fetchProfile()
    submitAddress()
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

  const goToInvoices = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/orders`, {
      method: "POST", 
      body: JSON.stringify({
        delivery_fee: 10000,
        delivery_address: payload[0]
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
        // body: JSON.stringify(payload),
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

  // const fetchCart = () => {
  //   fetch(`http://localhost:8000/api/carts`, {
  //       headers: {
  //           "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZmYyZGQ3NWY1ZDc1NmU3MjFiZmYiLCJmdWxsX25hbWUiOiJLYWRlayBTdWNpcHRhIiwiZW1haWwiOiJrYWRla0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjdXN0b21lcl9pZCI6OSwiaWF0IjoxNjcwNTc3OTkwfQ.xkwYFydTTYD7T3aFQV5CqZfmrEc5SSKf7DWImi9nEEE`
  //       }
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //       setCart(data)
  //       console.log(data)
  //   })
  //   };

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
        {payload.map((item, index) => (
            <Row key={index}>
                <Col>
                    <ListGroup.Item><strong>Alamat</strong></ListGroup.Item>
                    <ListGroup.Item><strong>Sub Total</strong></ListGroup.Item>
                    <ListGroup.Item><strong>Ongkir</strong></ListGroup.Item>
                    <ListGroup.Item><strong>Total</strong></ListGroup.Item>
                </Col>
                <Col>
                    <ListGroup.Item>{item.detail}</ListGroup.Item>
                    <ListGroup.Item>Rp.{numberWithCommas(totalCartPrice)}.00</ListGroup.Item>
                    <ListGroup.Item>Rp.5.000.00</ListGroup.Item>
                    <ListGroup.Item><strong>Rp.{numberWithCommas(totalCartPrice+5000)}.00</strong></ListGroup.Item>
                </Col>
            </Row>
            ))}
            <div style={{justifyContent: "center", alignItems: "center"}}>
            <div style={{float: "left"}}>
            <Button
            onClick={() => goToCheckout()}
            style={{
                width: "100%",
                marginBottom: "5px",
                marginTop: "5px",
                marginLeft: "5px"
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
                paddingLeft: "10px"
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