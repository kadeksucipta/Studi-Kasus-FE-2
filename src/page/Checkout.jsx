import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import { Col, ListGroup, Row } from "react-bootstrap";

const Profile = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  const goToPemesanan = () => {
      navigate("/Pemesanan")
  }
  const goToConfirmasi = () => {
      navigate("/Confirmasi", 
      {state: {address: selectAddress}})
  }

  const [selectAddress, setSelectAddress] = useState()
  const [payload, setPayload] = useState([])
  const [cart, setCart] = useState([])
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    fetchProfile()
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
        <Card.Header style={{width: "100%", background: "#DC0000", color: "white"}}><strong>Check Out</strong></Card.Header>
        <ListGroup style={{width: "100%"}} variant="flush">
        <ListGroup.Item><strong>Pilih Alamat Pengiriman</strong></ListGroup.Item>
        <ListGroup.Item>{payload.length}</ListGroup.Item>
        {payload.map((item, index) => (
            <Row key={index}>
                <Col>
                    <ListGroup.Item><strong>Kota</strong></ListGroup.Item>
                    <ListGroup.Item><input type="checkbox" checked={item._id === selectAddress?._id} onClick={() => setSelectAddress(item)}/>{" "}{item.kabupaten}</ListGroup.Item>
                </Col>
                <Col>
                    <ListGroup.Item><strong>Detail</strong></ListGroup.Item>
                    <ListGroup.Item>{item.detail}</ListGroup.Item>
                </Col>
            </Row>
        ))}
        </ListGroup>
        <Button
        onClick={() => goToConfirmasi()}
        style={{
            width: "99%",
            marginBottom: "5px",
            marginTop: "5px",
            background: "#22668a"
            }}
        >Selanjutnya
        </Button>
        </Card>
        </div>
        
    </React.Fragment>
  );
}

export default Profile;