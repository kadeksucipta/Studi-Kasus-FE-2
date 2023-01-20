import React, { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; 
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../component/NavbarComponent";
import { Badge, Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { setCart } from "../App/features/Cart/Actions";

const Home = () => {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate("/Home")
    }
    const goToCart = () => {
        navigate("/Cart")
    }
    const goToProfile = () => {
        navigate("/Profile")
    }

    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [tags, setTags] = useState([])
    const [loading,setLoading] = useState(false)
    const [select, setSelect] = useState([])
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        fetchProducts()
        fetchTags()
    }, [])

    const fetchProducts = () => {
        fetch(`http://localhost:8000/api/products?q=${keyword}&skip=0&limit=50`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.data)
            console.log(data)
        })
    }

    const fetchTags = () => {
        fetch(`http://localhost:8000/api/tags`)
        .then(res => res.json())
        .then(data => {
            setTags(data)
            console.log(data)
        })
    };
    
    const handleClick = (category) => {
        setSelect(category)
        fetch(`http://localhost:8000/api/products?limit=50&category=${category}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.data)
            console.log(data)
        })
    }

    const fetchCart = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:8000/api/carts`, {
              headers: {
                  "Authorization" : `Bearer ${token}`
              }
          })
          .then(res => res.json())
          .then(data => {
              console.log({data});
              dispatch(setCart(data));
              console.log(data)
        })
      };

    const addtoCart = (item) => {
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("userData")
  
        console.log(cart);
        const carts = cart && cart.map(value => value.product)
        fetch(`http://localhost:8000/api/carts`, {
  
            method: "PUT",
            body: JSON.stringify({
                "user": JSON.parse(userData),
                "items": [...carts,
                    item
                ]
            }),
  
            headers: {
                "Authorization" : `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(() => fetchCart())
        console.log(item)
      }

    const searchHandler = (query) => {
        setKeyword(query)
    }

    const requestButton = () => {
        setLoading(true)
        fetchProducts()
    }

    return(
        <React.Fragment>
            <Navbar variant="dark" expand="lg">
            <Container>
            <Navbar.Brand style={{cursor: "pointer"}} onClick={() => goToHome()}><strong>Slebew</strong>Mart</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link href="#action1"></Nav.Link>
                <NavDropdown onChange={e => {handleClick(e.target.value)}} title="Category" id="navbarScrollingDropdown">
                <NavDropdown.Item value="Semua Menu">
                    Semua Menu
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item value="Makanan">
                    Makanan
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item value="Minuman">
                    Minuman
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item value="Snack">
                    Snack
                    </NavDropdown.Item>
                </NavDropdown>

            {/* <select title="Category" id="navbarScrollingDropdown">
                <option value="Semua Menu">
                  Semua Menu
                </option>
                <NavDropdown.Divider />
                <option value="Makanan">
                  Makanan
                </option>
                <NavDropdown.Divider />
                <option value="Minuman">
                  Minuman
                </option>
                <NavDropdown.Divider />
                <option value="Snack">
                  Snack
                </option>
            </select> */}

                <Nav.Link href="#first">
                    <FontAwesomeIcon onClick={() => goToProfile()} icon={faUser} />
                </Nav.Link>
                <Nav.Link href="#first">
                    <FontAwesomeIcon onClick={() => goToCart()} icon={faCartShopping} />
                    <Badge pill bg="danger">{cart.length}</Badge>{' '}
                </Nav.Link>

                </Nav>
                <Form className="d-flex">
                <Form.Control
                    onChange={e => searchHandler(e.target.value)}
                    type="search"
                    placeholder="cari menu..."
                    className="me-2"
                    aria-label="Search"
                />
                <Button onClick={() => requestButton()} style={{background: "white",  color: "#22668a"}} className="btn-search"><FontAwesomeIcon icon={faSearch}/></Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </React.Fragment>
    )
}

export default Home