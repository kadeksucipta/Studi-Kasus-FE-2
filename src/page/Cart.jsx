import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../component/NavbarComponent";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Col, ListGroup, Row } from "react-bootstrap";
import {
  decrementWitchCheckingAction,
  increment,
} from "../App/features/Counter/actions";
import { numberWithCommas } from "../component/Utils";
import { removeFromCart, addToCart } from "../App/features/Cart/Actions";

const Profile = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToPemesanan = () => {
    navigate("/Pemesanan");
  };
  const goToAlamat = () => {
    navigate("/Alamat");
  };
  const goToCheckout = () => {
    navigate("/Checkout");
  };

  var totalCartPrice = 0;
  const [totalPrice, setTotalaPrice] = useState([])
  const cart = useSelector((state) => state.cart);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    // fetchProfile()
    // fetchCart()
  }, []);

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

  const addtoCart = (item) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    fetch(`http://localhost:8000/api/carts`, {
      method: "PUT",
      body: JSON.stringify({
        user: JSON.parse(userData),
        items: [...cart, {...item, qty: 1}]
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      dispatch(addToCart({ ...item, qty: 1 }));
    });

    console.log(cart);
  };

  const removeProduct = (item) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    fetch(`http://localhost:8000/api/carts`, {
      method: "DELETE",
      body: JSON.stringify({
        user: JSON.parse(userData),
        items: cart,
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      dispatch(removeFromCart({ ...item, qty: 1 }));
    });

    console.log(cart);
  };

  const fetchCart = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setCart(data)
        console.log(data);
      });
  };

  let { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  {cart.map((item, index) => (
    totalCartPrice += item.price * item.qty
  ))}
  
  return (
    <React.Fragment>
      <NavbarComponent />

      {/*---------------------------------------------------------*/}

      <div
        style={{
          marginTop: "25px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Card
          style={{
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Header
            style={{ width: "100%", background: "#DC0000", color: "white" }}
          >
            <strong>Keranjang Belanja</strong>
          </Card.Header>
          <h5 onClick={() => dispatch(increment(1))}>
            <strong>Sub Total : Rp.{numberWithCommas(totalCartPrice)}.00</strong>
          </h5>
          <ListGroup
            style={{ width: "100%"}}
            variant="flush"
          >
            {cart.map((item, index) => (
              <Row style={{ marginBottom: "5px" }} key={index}>
                <Col>
                  <ListGroup.Item>
                    <strong>Gambar</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img
                      style={{ width: "150px", height: "100px", borderRadius: "5px"}}
                      variant="top"
                      src={
                        "http://localhost:8000/images/products/" +
                        item.image_url
                      }
                    />
                  </ListGroup.Item>
                </Col>
                <Col>
                  <ListGroup.Item>
                    <strong>Barang</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>{item.name}</ListGroup.Item>
                </Col>
                <Col>
                  <ListGroup.Item>
                    <strong>Harga</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Rp. {numberWithCommas(item.price)}
                  </ListGroup.Item>
                </Col>

                <Col>
                  <ListGroup.Item>
                    <strong>Qty</strong>
                  </ListGroup.Item>
                  <Button
                    variant="danger"
                    onClick={() => removeProduct(item)}
                    className="plus"
                  >
                    <strong>-</strong>
                  </Button>{" "}
                  &nbsp; <span>{item.qty}</span> &nbsp;{" "}
                  <Button
                    variant="primary"
                    onClick={() => addtoCart(item)}
                    className="plus"
                  >
                    <strong>+</strong>
                  </Button>
                </Col>
              </Row>
            ))}
          </ListGroup>
          <Button style={{width: "99%", margin: "5px 5px 5px 5px"}} onClick={() => goToCheckout()}>Check Out</Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Profile;
