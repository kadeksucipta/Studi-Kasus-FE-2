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
import {  decrementWitchCheckingAction, increment } from "../App/features/Counter/actions"

const Profile = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  const goToInvoices = () => {
      navigate("/Invoices")
  }
  const goToCheckout = () => {
      navigate("/Checkout")
  }

  const [cart, setCart] = useState([])
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

  const fetchCart = () => {
    fetch(`http://localhost:8000/api/carts`, {
        headers: {
            "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZmYyZGQ3NWY1ZDc1NmU3MjFiZmYiLCJmdWxsX25hbWUiOiJLYWRlayBTdWNpcHRhIiwiZW1haWwiOiJrYWRla0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjdXN0b21lcl9pZCI6OSwiaWF0IjoxNjcwNTc3OTkwfQ.xkwYFydTTYD7T3aFQV5CqZfmrEc5SSKf7DWImi9nEEE`
        }
    })
    .then(res => res.json())
    .then(data => {
        setCart(data)
        console.log(data)
    })
    };

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
                    <ListGroup.Item>JLN DR SOETOMO GG 4 MATARAM</ListGroup.Item>
                    <ListGroup.Item>Rp.110.000</ListGroup.Item>
                    <ListGroup.Item>Rp.10.000</ListGroup.Item>
                    <ListGroup.Item><strong>Rp.120.000</strong></ListGroup.Item>
                </Col>
            </Row>
        </ListGroup>
        <div style={{display: "flex"}}>
        <Button
        onClick={() => goToCheckout()}
        style={{
            width: "99%",
            marginBottom: "5px",
            marginTop: "5px",
            float: "left",
        }}>Kembali</Button>

        <Button
        onClick={() => goToInvoices()}
        style={{
            width: "99%",
            marginBottom: "5px",
            marginTop: "5px"
        }}>Bayar</Button>
        </div>
        </Card>
        </div>
        
    </React.Fragment>
  );
}

export default Profile;