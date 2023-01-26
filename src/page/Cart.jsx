import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../component/NavbarComponent";
import Card from "react-bootstrap/Card";
import { Col, ListGroup, Row } from "react-bootstrap";
import { increment } from "../App/features/Counter/actions";
import { numberWithCommas } from "../component/Utils";
import { setCart } from "../App/features/Cart/Actions";


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

  const dispatch = useDispatch()
  let { count } = useSelector((state) => state.counter);
  var totalCartPrice = 0;
  const cart = useSelector((state) => state.cart);

  const addtoCart = (item) => {
    const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      let oldCart = cart.map(item => ({...item.product, qty: item.qty}))
      let existingItemIndex = oldCart.findIndex(cartItem => cartItem._id === item._id)
      let items 
      if (existingItemIndex >= 0) {
        oldCart[existingItemIndex] = {...oldCart[existingItemIndex], qty: oldCart[existingItemIndex].qty+1}
        items = oldCart
      } else {
        items = [...oldCart, {...item, qty: 1}]
      }
      console.log("oldcart :", oldCart);
      console.log("cart: ",cart);
      console.log("itemscart :", items);

      fetch(`http://localhost:8000/api/carts`, {
        method: "PUT",
        body: JSON.stringify({
          user: JSON.parse(userData),
          items
        }),

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log({response});
        if (response.status === 200) {
          fetchCart() 
        }
      })
    console.log(cart);
  };

  const removeProduct = (item) => {
    const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      let oldCart = cart.map(item => ({...item.product, qty: item.qty}))
      let existingItemIndex = oldCart.findIndex(cartItem => cartItem._id === item._id)
      let items 
      if (existingItemIndex >= 0) {
        oldCart[existingItemIndex] = {...oldCart[existingItemIndex], qty: oldCart[existingItemIndex].qty-1}
        items = oldCart
      } else {
        items = [...oldCart, {...item, qty: 1}]
      }
      console.log("oldcart :", oldCart);
      console.log("cart: ",cart);

      fetch(`http://localhost:8000/api/carts`, {
        method: "PUT",
        body: JSON.stringify({
          user: JSON.parse(userData),
          items
        }),

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log({response});
        if (response.status === 200) {
          fetchCart() 
        }
      })

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
        dispatch(setCart(data));
        console.log(data);
      });
  };

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
                    onClick={() => removeProduct(item.product)}
                    className="plus"
                  >
                    <strong>-</strong>
                  </Button>{" "}
                  &nbsp; <span>{item.qty}</span> &nbsp;{" "}
                  <Button
                    variant="primary"
                    onClick={() => addtoCart(item.product)}
                    className="plus"
                  >
                    <strong>+</strong>
                  </Button>
                </Col>
              </Row>
            ))}
          </ListGroup>
          <Button style={{width: "99%", margin: "5px 5px 5px 5px", background: "#22668a"}} onClick={() => goToCheckout()}>Check Out</Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Profile;
