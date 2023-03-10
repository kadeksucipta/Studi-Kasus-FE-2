import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setCart } from "../App/features/Cart/Actions";
import { numberWithCommas } from "../component/Utils";
import swal from "sweetalert";
import logo from "./SLEBEW MART.png"

const Home = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToCart = () => {
    navigate("/Cart");
  };

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState([]);
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.login);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
    fetchProducts();
    fetchTags();
    fetchCart();
  }, []);

  const fetchProducts = () => {
    fetch(`http://localhost:8000/api/products?q=${keyword}&skip=0&limit=50`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const handleClick = (category) => {
    setSelect(category);
    fetch(`http://localhost:8000/api/products?limit=50&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        console.log(data);
      });
  };

  const fetchTags = () => {
    fetch(`http://localhost:8000/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };
  
  const handleTags = (tags) => {
    fetch(`http://localhost:8000/api/products?limit=50&tags=${tags}`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.data);
      console.log(data);
    });
  }

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
      console.log("itemsss :", items);

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
          swal({
            title: "Pesanan Diterima",
            text: "Terimakasi Sudah Berbelanja :)",
            icon: "success",
            button: false,
            timer: 1000,
          });
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
        console.log({ data });
        dispatch(setCart(data));
        console.log(data);
      });
  };

  const searchHandler = (query) => {
    setKeyword(query);
  };

  const requestButton = () => {
    setLoading(true);
    fetchProducts();
  };

  return (
    <React.Fragment>
      <Navbar variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo}  width="110" height="30"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1"></Nav.Link>
              <select
                style={{
                  borderRadius: "4px",
                  background: "#22668a",
                  color: "white",
                  border: "none",
                }}
                onChange={(e) => {
                  handleClick(e.target.value);
                }}
                title="Category"
                id="navbarScrollingDropdown"
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value="Semua Menu"
                >
                  Semua Menu
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Makanan"
                >
                  Makanan
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Minuman"
                >
                  Minuman
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Snack"
                >
                  Snack
                </option>
              </select>

              <Nav.Link href="#">
                <FontAwesomeIcon onClick={() => goToProfile()} icon={faUser} />
              </Nav.Link>
              <Nav.Link href="#">
                <FontAwesomeIcon
                  onClick={() => goToCart()}
                  icon={faCartShopping}
                />
                <Badge pill bg="danger">
                  {cart.length}
                </Badge>{" "}
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                style={{width: "100%", border: "none", borderRadius: "5px", paddingLeft: "5px"}}
                onChange={(e) => searchHandler(e.target.value)}
                type="search"
                placeholder="cari menu..."
                className="me-2"
                aria-label="Search"
              />
              <Button
                onClick={() => requestButton()}
                style={{ background: "white", color: "#22668a" }}
                className="btn-search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h5 className="tags"><FontAwesomeIcon icon={faTag} /><strong>Tags :</strong><hr style={{width: "47%", border: "1px solid black"}}/></h5>

      <div className="tag-atas">
        {tags.map((item, index) => (
          <button key={index} value={tags} className="button-tags" onClick={() => handleTags(item.name)}>
            <FontAwesomeIcon icon={faTag} />
            {item.name}
          </button>
        ))}
      </div>

      {/*---------------------------------------------------------------*/}

      <div className="card-container">

        <br />
        {products.length === 0 && (
          <span style={{marginLeft: "40%", marginTop: "30px", marginBottom: "30px"}}>Maaf menu tidak ditemukan</span>
        )}
        {products.map((item, index) => (
          <Col md={3} xs={6} className="mb-1 mt-4">
            <Card
              key={index}
              className="shadow"
              style={{ border: "5px solid white" }}
            >
              <Card.Img
                style={{ cursor: "pointer" }}
                variant="top"
                src={"http://localhost:8000/images/products/" + item.image_url}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <hr />
                <Card.Text>
                  <strong>Rp. {numberWithCommas(item.price)}</strong>
                </Card.Text>
                <Card.Text>{item.category.name}</Card.Text>
                {item.tags.map((value, index) => (
                  <button key={index} className="tag-item">
                    <FontAwesomeIcon icon={faTag} />
                    {value.name}
                  </button>
                ))}
                <button
                  style={{
                    background: "red",
                    borderRadius: "5px",
                    marginLeft: "20px",
                    border: "none",
                    color: "white",
                  }}
                  onClick={() => addtoCart(item)}
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
