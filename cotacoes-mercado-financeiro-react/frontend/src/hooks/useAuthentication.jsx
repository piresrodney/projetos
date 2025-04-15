import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const [messageException, setMessageException] = useState("");
  const [userLogged, setUserLogged] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }, []);

  async function login(user) {
    let msgType = false;

    try {
      const response = await api.post("/user/login", user);
      msgType = true;
      setUserLogged(response.data.data);
      authorization(msgType, response);
      return response.data;
    } catch (error) {
      setMessageException(error.response.data.message);
      authorization(msgType);
    }
  }

  async function authorization(logged, reponseLogin) {
    setAuthenticated(logged);

    sessionStorage.setItem("authorized", logged);

    if (logged) {
      sessionStorage.setItem("token", reponseLogin.data.token);
      sessionStorage.setItem("idUser", reponseLogin.data.id);
      navigate("/stocks");
    }
  }

  async function logout() {
    setAuthenticated(false);
    sessionStorage.setItem("authorized", false);
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("idUser", "");
    navigate("/");
  }

  async function registerUser(user) {
    try {
      const response = await api.post("/user/createuser", user);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  return {
    authenticated,
    login,
    messageException,
    logout,
    userLogged,
    registerUser,
  };
}
