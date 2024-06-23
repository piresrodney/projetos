import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../utils/api";

import styles from "./NewAccountForm.module.css";

import Input from "./Input";
import Button from "./Button";
import AlertMessage from "./AlertMessage";

const NewAccountForm = () => {
  const [user, setUser] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [returnReq, setReturnReq] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setShowMessage(returnReq.response?.status === 422);

    if (returnReq?.status === 201) {
      sessionStorage.setItem("authorized", true);
      navigate("/stocks");
    }
  }, [returnReq]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await api.post("/user/createuser", user).then((response) => {
        setReturnReq(response);
        return;
      });
    } catch (error) {
      setReturnReq(error);
    }
  }

  return (
    <form className={styles.newAccountForm} onSubmit={submit}>
      <div>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Apelido"
          type="text"
          name="nickname"
          placeholder="Como gostaria de ser chamado(a)?"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          type="text"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="Digite a senha novamente"
          handleOnChange={handleChange}
        />
        <AlertMessage
          showMessage={showMessage}
          textMessage={returnReq.response?.data.message}
        />
        <Button type="submit" value="Cadastrar" />
      </div>
    </form>
  );
};

export default NewAccountForm;
