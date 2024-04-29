import { useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import './App.css';
import socket from "./context/Socket";
export default function App() {
  const element = useRoutes(routes);
  const { isLogin} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      if (window.location.href.includes("admin")) navigate("/admin/login");
      else if (window.location.href.includes("user")) navigate("/user/login");
      else navigate("/guest")
    }
  }, [isLogin]);
  return <div>{element}</div>;
}
