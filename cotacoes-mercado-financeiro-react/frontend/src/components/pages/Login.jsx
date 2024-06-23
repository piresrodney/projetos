import { useContext, useState } from "react";

import styles from "./Login.module.css";

import Input from "../form/Input";
import Button from "../form/Button";

import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";
import AlertMessage from "../form/AlertMessage";

const Login = () => {
  const [user, setUser] = useState({});
  const { authenticated, login, messageException } = useContext(Context);
  const [showMessageLogin, setShowMessageLogin] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();
    login(user);

    if (
      !sessionStorage.getItem("authorized") ||
      sessionStorage.getItem("authorized") === "false"
    ) {
      setShowMessageLogin(true);
    }
  }

  return (
    <section>
      <div className={styles.div_background}>
        <h1>Login</h1>
        <form onSubmit={handleSumit}>
          <div>
            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Digite o e-mail"
              handleOnChange={handleChange}
            />
          </div>
          <div>
            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite a senha"
              handleOnChange={handleChange}
            />
          </div>
          <AlertMessage
            showMessage={showMessageLogin}
            textMessage={messageException}
          />
          <Button type="submit" value="Cadastrar" />
        </form>
        <p className={styles.p_userWithoutAccount}>
          Ainda não tem conta?{" "}
          <span className={styles.spanLink}>
            <Link to={"newaccount"}>Clique aqui!</Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
