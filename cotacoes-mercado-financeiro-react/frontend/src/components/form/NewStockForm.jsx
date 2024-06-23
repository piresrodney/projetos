import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UserContext";

import api from "../../utils/api";

import styles from "./NewStockForm.module.css";

import Input from "./Input";
import AlertMessage from "./AlertMessage";

const NewStockForm = () => {
  const navigate = useNavigate();
  const [stock, setStock] = useState({});
  const [returnReq, setReturnReq] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { userLogged } = useContext(Context);

  useEffect(() => {
    setShowAlert(returnReq.status !== "202" ? false : true);

    if (returnReq.status === "201") backToHome();
  }, [returnReq]);

  function backToHome() {
    navigate("/stocks");
  }

  function handleChange(e) {
    setStock({ ...stock, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();

    const token = { _id: sessionStorage.getItem("token") };
    try {
      const data = await api
        .post("/stocks/createstock", { stock, token })
        .then((response) => {
          setReturnReq(response.data);
          return;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={styles.formNewStock} onSubmit={submit}>
      <div>
        <Input
          text="Ativo"
          type="text"
          name="tagStock"
          placeholder="Digite a TAG do ativo"
          handleOnChange={handleChange}
        />
      </div>
      <AlertMessage showMessage={showAlert} textMessage={returnReq.message} />
      <div className={styles.divButtons}>
        <input
          className={styles.input_submit}
          type="submit"
          value="Cadastrar"
        />
        <input
          className={styles.input_back}
          type="button"
          value="Voltar"
          onClick={backToHome}
        />
      </div>
    </form>
  );
};

export default NewStockForm;
