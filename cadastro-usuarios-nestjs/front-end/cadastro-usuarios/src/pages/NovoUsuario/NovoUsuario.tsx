import React, { useState } from "react";
import styles from "./NovoUsuario.module.css";
import api from "../../api/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const NovoUsuario = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string[]>([]);

  const navigate = useNavigate();

  async function gravarUsuario(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const usuario = { nome, email, telefone, endereco };
    try {
      const response = await api.post("/usuarios", usuario);

      if (response.status === 201) {
        voltarTela();
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setMensagemErro(error.response.data.message);
      }
    }
  }

  function voltarTela() {
    navigate("/");
  }

  return (
    <form className={styles.form} onSubmit={gravarUsuario}>
      <h2>Novo usuário</h2>
      <div className={styles.divPrincipal}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={nome}
            onChange={(ev) => setNome(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="text"
            value={telefone}
            onChange={(ev) => setTelefone(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço</label>
          <input
            id="endereco"
            name="endereco"
            type="text"
            value={endereco}
            onChange={(ev) => setEndereco(ev.target.value)}
          />
        </div>
      </div>
      {mensagemErro?.length > 0
        ? mensagemErro.map((m) => <p className={styles.mensagem}>{m}</p>)
        : null}

      <span className={styles.spanBotoes}>
        <Button text={{ caption: "Gravar" }} onClick={() => {}} />
        <Button text={{ caption: "Voltar" }} onClick={voltarTela} />
      </span>
    </form>
  );
};

export default NovoUsuario;
