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
import { Form, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavbarComponent from "../../component/NavbarComponent";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Col } from "react-bootstrap";

const TambahAlamat = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  const goToPemesanan = () => {
      navigate("/Pemesanan")
  }
  const goToAlamat = () => {
      navigate("/Alamat")
  }
  const goToLogout = () => {
    navigate("/Logout")
  }

  const [provinsi, setProvinsi] = useState([])
  const [kabupaten, setKabupaten] = useState([])
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    fetchProfile()
    fetchProvinsi()
    fetchKabupaten()
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

  const fetchProvinsi = () => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
    .then(res => res.json())
    .then(data => {
      setProvinsi(data)
      console.log(data)
    })
  };

  const fetchKabupaten = () => {
    fetch(`https://github.com/emsifa/api-wilayah-indonesia/blob/master/static/api/regencies/11.json`)
    .then(res => res.json())
    .then(data => {
      setKabupaten(data)
      console.log(data)
    })
  };
  
  return (
    <React.Fragment>
            
        <NavbarComponent />

        {/*---------------------------------------------------------*/}

        <Card className="mt-5">
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link onClick={() => goToProfile()}>Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToAlamat()}  href="#first">Alamat</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToPemesanan()}>Pemesanan</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToLogout()}>Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Alamat</Card.Title>
            <hr style={{width: "10%"}} />
            <form style={{display: "flex"}}>
            <input className="form-alamat" type="text" placeholder="Masukan Alamat" />
                <select style={{marginLeft: "10px", width: "20%", borderRadius: "5px"}} name="" id="role" placeholder="select">
                    <option disabled hidden selected>Porvinsi</option>
                    {provinsi.map((item, index) => (
                      <option key={index} value="admin">{item.name}</option>
                    ))}
                </select>
            </form>
            <br />

            <form style={{display: "flex"}}>
                <select style={{width: "20%", borderRadius: "5px"}} name="" id="role" placeholder="select">
                    <option disabled hidden selected>Kabupaten</option>
                    {kabupaten.map((item, index) => (
                      <option key={index} value="admin">{item.name}</option>
                    ))}
                </select>

                <select style={{marginLeft: "10px", width: "20%", borderRadius: "5px"}} name="" id="role" placeholder="select">
                    <option disabled hidden selected>Kecamatan</option>
                    <option value="admin">as</option>
                </select>
            </form>
            <br /> 

            <form style={{display: "flex"}}>
                <select style={{width: "20%", borderRadius: "5px"}} name="" id="role" placeholder="select">
                    <option disabled hidden selected>Kelurahan</option>
                    <option value="admin">asd</option>
                </select>

                <select style={{marginLeft: "10px", width: "20%", borderRadius: "5px"}} name="" id="role" placeholder="select">
                    <option disabled hidden selected>None</option>
                    <option value="admin">asd</option>
                </select>
            </form>
            <br />

            <textarea style={{borderRadius: "5px", paddingLeft: "5px", width: "40.6%", height: "80px"}} placeholder="Detail Alamat"></textarea>
            <div>
            <br />
            <Button style={{
                width: "100%",
                background: "#22668a"
            }}
            variant="primary">Simpan</Button>
            </div>
          </Card.Body>
        </Card>
        
    </React.Fragment>
  );
}

export default TambahAlamat;