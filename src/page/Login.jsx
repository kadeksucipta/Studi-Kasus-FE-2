import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setUserData } from "../../src/App/features/Login/Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logomart from "./logo.png"
import "./Login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    dispatch(setUserData(user));
    navigate("./Home");
  };
  const goToRegister = () => {
    navigate("./Register");
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const fetchLogin = (formData) => {
    fetch(`http://localhost:8000/auth/login`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 400) {
          return setError(true);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data.user, token: data.token }));

        createItem(data);
        goToHome();
        console.log(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      return setError(true);
    }
    const formData = new URLSearchParams({
      email,
      password,
    });
    fetchLogin(formData);
    console.log(email, password);
  };

  const createItem = (data) => {
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const getItem = () => {
    var data = localStorage.getItem("userData");
    document.getElementById("demo").innerHTML = data;
  };

  return (
    <div className="bg">
    <div className="container">
      <div className="box-login">
        <div className="container-login">
        <img style={{
              width: "200px",
              position: "absolute",
              top: "1%"
            }}
            src={logomart}/>
          <Form onSubmit={handleSubmit} className="form-login">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="email-login"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              {error && email.length <= 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Email tidak boleh kosong !
                </label>
              ) : (
                ""
              )}

              {error && email.length > 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Email belum terdaftar !
                </label>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              {error && password.length <= 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Password tidak boleh kosong !
                </label>
              ) : (
                ""
              )}

              {error && password.length > 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Password salah !
                </label>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              style={{ width: "100%", background: "#22668a"}}
              onClick={() => handleSubmit()}
              variant="primary"
              type="submit"
            >
              Log In
            </Button>
            <hr/>
            <Button
              style={{ width: "100%", background: "#379237"}}
              onClick={() => goToRegister()}
              variant="success"
              type="submit"
            >
              Sign Up
            </Button>
            </Form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
