import React from "react";
import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { LayoutItemsProps } from "./components/Layout";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Products from "./pages/Products";

const items: LayoutItemsProps[] = [
  {
    label: "Dashboard",
    key: "/dashboard",
    // @ts-ignore
    element: <Home />,
    // icon: React.createElement(UploadOutlined),
  },
  {
    label: "Companies",
    key: "/companies",
    // @ts-ignore
    element: <Companies />,
    // icon: React.createElement(UserOutlined),
  },
  {
    label: "Products",
    key: "/products",
    // @ts-ignore
    element: <Products />,
    // icon: React.createElement(VideoCameraOutlined),
  },
];

function PrivateRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />}>
          {items.map((item) => (
            <Route
              key={item.key}
              path={item.key}
              element={<AppLayout items={items} item={item.element} />}
            ></Route>
          ))}
        </Route>
      </Routes>
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
