import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { setUserData } from "../../src/App/features/Login/Actions"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState ({
      email: "",
      password: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToLogin = () => {
      dispatch(setUserData(user))
      navigate("/")
  }
  

  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [select, setSelect] = useState([])

  const fetchLogin = (formData) => {
    fetch(`http://localhost:8000/auth/register`,
        {
        method: "POST",
        body: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    )
    .then((res) => {
      console.log(res);
      if (res.status === 400) {
        return setError(true);
      }
      return res.json();
    })
    .then(data => {
        dispatch(setUserData({user: data.user, token: data.token}))
        goToLogin()
        console.log(data)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email.length == 0 || password.length == 0 ) {
       return setError(true)
    }
    console.log(name);
    console.log(select);
    const formData = new URLSearchParams({
        full_name: name,
        email,
        password,
        role: select
    });
    fetchLogin(formData)
    console.log(email,password)
  }

    return(
    <div className="container">
      <div className="box-login">
        <div className="container-login">
        <Form onSubmit={handleSubmit} className="form-login">
          <Form.Group className="mb-3" >
            <div>
            <Form.Label><strong>Full Name</strong></Form.Label>
            <Form.Control className="email-login" type="text" onChange={e => setName(e.target.value)} placeholder="Enter name" />
            </div>
            {error && name.length<= 0?
            <label style={{color: "red"}} className="error-login">Nama tidak boleh kosong !</label>:""}

            {error && name.length > 0?
            <label style={{color: "red"}} className="error-login">Nama minimal 8 karakter !</label>:""}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div>
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
            </div>
            {error && email.length<= 0?
            <label style={{color: "red"}} className="error-login">Email tidak boleh kosong !</label>:""}

            {error && email.length > 0?
            <label style={{color: "red"}} className="error-login">Email Sudah Terdaftar !</label>:""}
          </Form.Group>
                
          <Form.Group className="mb-3">
            <div>
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            {error && password.length<= 0?
            <label style={{color: "red"}} className="error-login">Password tidak boleh kosong !</label>:""}

            {error && name.length > 0?
            <label style={{color: "red"}} className="error-login">Password minimal 8 karakter !</label>:""}
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label><strong>Role</strong></Form.Label>
            <div>
            <select style={{
                width: "100%",
                height: "40px",
                borderRadius: "7px",
                paddingLeft: "10px",
                background: "none",
                cursor: "pointer"}} className="role-input" name="" id="role" placeholder="select" onChange={e => setSelect(e.target.value)}>
                <option disabled hidden selected>select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            </div>
            {error && select.length<= 0?
            <label style={{color: "red"}} className="error-login">Pilih role Anda !</label>:""}
          </Form.Group>
          <br />
          <Button style={{width: "100%"}} onClick={() => handleSubmit()} variant="primary" type="submit">
            Let's Join
          </Button>
        </Form>
        </div>
        </div>
    </div>

    )
}

export default Login;