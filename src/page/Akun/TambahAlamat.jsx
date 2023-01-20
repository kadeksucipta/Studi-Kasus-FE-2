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
import { Form, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavbarComponent from "../../component/NavbarComponent";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Col } from "react-bootstrap";

const TambahAlamat = () => {
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
  const goToLogout = () => {
    navigate("/Logout");
  };

  const [select, setSelect] = useState([]);
  const [error, setError] = useState(false)
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [payload, setPayload] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    detail: "",
    nama: ""
  })
  //-------------------------------------------
  const [nama, setNama] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchProvinsi();
  }, []);

  const fetchProfile = (formData) => {
    fetch(`http://localhost:8000/auth/me`, {
      method: "GET",
      body: formData,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyZmYyZGQ3NWY1ZDc1NmU3MjFiZmYiLCJmdWxsX25hbWUiOiJLYWRlayBTdWNpcHRhIiwiZW1haWwiOiJrYWRla0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJjdXN0b21lcl9pZCI6OSwiaWF0IjoxNjcwOTk0NzkyfQ.SR3QSv5msez833UDgbOdnWwIQWhtonKyBDC38Iun0Jo`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  };

  const fetchProvinsi = () => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((res) => res.json())
      .then((data) => {
        setProvinsi(data);
        console.log(data);
      });
  };

  const fetchKabupaten = (provincesId) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provincesId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setKabupaten(data);
        console.log(data);
      });
  };

  const fetchKecamatan = (districtsId) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${districtsId}.json`)
    .then((res) => res.json())
    .then((data) => {
      setKecamatan(data)
      console.log(data);
    });
  };

  const fetchKelurahan = (villagesId) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${villagesId}.json`)
    .then((res) => res.json())
    .then((data) => {
      setKelurahan(data)
      console.log(data);
    });
  };

  const submitAddress = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/delivery-addresses`, {
      method: "POST",
        body: JSON.stringify(payload),

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
    goToAlamat()
  }

  // HANDLE API WILAYAH RI
  const handleProvinsi = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, provinsi: item.name})
    fetchKabupaten(item.id)
  };

  const handleKabupaten = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, kabupaten: item.name})
    fetchKecamatan(item.id)
  };

  const handleKecamatan = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, kecamatan: item.name})
    fetchKelurahan(item.id)
  };

  const handleKelurahan = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, kelurahan: item.name})
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
              <Nav.Link onClick={() => goToAlamat()} href="#first">
                Alamat
              </Nav.Link>
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
          <Form>
            <hr style={{ width: "10%" }} />
            <form style={{ display: "flex" }}>
              <input
                onChange={e => setPayload({...payload, nama: e.target.value})}
                className="form-alamat"
                type="text"
                placeholder="Masukan Alamat"
              />
              <select
                onChange={e => handleProvinsi(e.target.value)}
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  borderRadius: "5px",
                }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Provinsi
                </option>
                {provinsi.map((item, index) => (
                  <option key={index}  value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </form>
            <br />

            <form style={{ display: "flex" }}>
              <select
                onChange={e => handleKabupaten(e.target.value)}
                style={{ width: "20%", borderRadius: "5px" }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Kabupaten
                </option>
                {kabupaten.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                onChange={e => handleKecamatan(e.target.value)}
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  borderRadius: "5px",
                }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Kecamatan
                </option>
                {kecamatan.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </form>
            <br />

            <form style={{ display: "flex" }}>
              <select
                onChange={e => handleKelurahan(e.target.value)}
                style={{ width: "20%", borderRadius: "5px" }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Kelurahan
                </option>
                {kelurahan.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  borderRadius: "5px",
                }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  None
                </option>
                <option value="admin">asd</option>
              </select>
            </form>
            <br />

            <textarea
              onChange={e => setPayload({...payload, detail: e.target.value})}
              style={{
                borderRadius: "5px",
                paddingLeft: "5px",
                width: "40.6%",
                height: "80px",
              }}
              placeholder="Detail Alamat"
            ></textarea>
            <div>
              <br />
              <Button
                onClick={() => submitAddress()}
                style={{
                  width: "100%",
                  background: "none",
                  color: "#22668a",
                  border: "2px solid #22668a"
                }}
              >
                <strong>Simpan</strong>
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default TambahAlamat;