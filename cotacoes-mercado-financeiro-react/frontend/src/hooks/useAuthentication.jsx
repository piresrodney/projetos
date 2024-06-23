import api from "../utils/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const [messageException, setMessageException] = useState("");
  const [userLogged, setUserLogged] = useState({});
  const navigate = useNavigate();

  async function login(user) {
    let msgType = false;

    try {
      const data = await api.post("/user/login", user).then((response) => {
        msgType = true;
        setUserLogged(response.data.data);
        setMessageException(response.data.message);
        authorization(msgType, response.data.data._id);
        return response.data;
      });
    } catch (error) {
      setMessageException(error.response.data.message);
      authorization(msgType);
    }
  }

  async function authorization(logged, tokenUser) {
    setAuthenticated(logged);

    sessionStorage.setItem("authorized", logged);

    if (logged) {
      sessionStorage.setItem("token", tokenUser);
      navigate("/stocks");
    }
  }

  async function logout() {
    setAuthenticated(false);
    sessionStorage.setItem("authorized", false);
    sessionStorage.setItem("token", "");
    navigate("/");
  }

  return { authenticated, login, messageException, logout, userLogged };
}
