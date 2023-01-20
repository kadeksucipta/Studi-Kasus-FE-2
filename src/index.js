import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './page/Home';
import Register from "./page/Register"
import Profile from "./page/Akun/Profile"
import Alamat from "./page/Akun/Alamat"
import Cart from "./page/Cart"
import Checkout from "./page/Checkout"
import Pemesanan from "./page/Akun/Pemesanan"
import Confirmasi from "./page/Confirmasi"
import Logout from "./page/Akun/Logout"
import Invoices from "./page/Invoices"
import TambahAlamat from "./page/Akun/TambahAlamat"
import Login from './page/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from "./App/store"
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "Home",
    element: <Home/>
  },
  {
    path: "Register",
    element: <Register/>
  },
  {
    path: "/Profile",
    element: <Profile />
  },
  {
    path: "/Alamat",
    element: <Alamat />
  },
  {
    path: "/Cart",
    element: <Cart />
  },
  {
    path: "/Checkout",
    element: <Checkout />
  },
  {
    path: "/Confirmasi",
    element: <Confirmasi />
  },
  {
    path: "/TambahAlamat",
    element: <TambahAlamat />
  },
  {
    path: "/Pemesanan",
    element: <Pemesanan />
  },
  {
    path: "/Invoices",
    element: <Invoices />
  },
  {
    path: "/Logout",
    element: <Logout />
  },
  {
    path: "/Login",
    element: <Login />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
