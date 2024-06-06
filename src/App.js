import { useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import './App.css';
import socket from "./context/Socket";
import {playlistService} from "./api/user/playlist";
import '@fontsource/roboto/400.css'; // Normal 400
import '@fontsource/roboto/500.css'; // Medium 500
import '@fontsource/roboto/700.css'; // Bold 700

export default function App() {
  const element = useRoutes(routes);
  const { isLogin, role, token, clearAuthData} = useContext(AuthContext);
  const navigate = useNavigate();
  const initData = async () => {
    const result = await playlistService.isAddedToPlaylist(token);
    if (!result.success) {
      clearAuthData();
    }
    if (!isLogin) {
      if (window.location.href.includes("admin")) navigate("/admin/login");
      else if (window.location.href.includes("user")) navigate("/user/login");
      else navigate("/guest")
    }
  }
  useEffect(() => {
    initData();
  }, [isLogin]);
  return <div>{element}</div>;
}
