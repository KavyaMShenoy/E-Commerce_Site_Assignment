import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';
import App from './App';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import Unauthorized from './components/Unauthorized';
import NotFound from './components/NotFound';

const router = createBrowserRouter(
  [

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/admin",
      element: <ProtectedRoute role="admin" element={<Admin />} />
    },
    {
      path: "/home",
      element: <AuthRoute element={<App />} />
    },
    {
      path: "/products",
      element: <AuthRoute element={<Products />} />
    },
    {
      path: "/details/:id",
      element: <AuthRoute element={<ProductDetails />} />
    },
    {
      path: "/cart",
      element: <AuthRoute element={<Cart />} />
    },
    {
      path: "/unauthorized",
      element: <AuthRoute element={<Unauthorized />} />
    },
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);