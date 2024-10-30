import { useEffect, useState } from "react";
import styles from "../NovoUsuario/NovoUsuario.module.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { AxiosError } from "axios";
import Button from "../../components/Button/Button";

const AtualizaUsuario = () => {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [mensagemErro, setMensagemErro] = useState<string[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/usuarios/${id}`).then((response) => {
      setNome(response.data.nome);
      setTelefone(response.data.telefone);
      setEndereco(response.data.endereco);
    });
  }, [id]);

  function voltarTela() {
    navigate("/");
  }

  async function atualizarUsuario(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const usuario = { nome, telefone, endereco };
    try {
      const response = await api.patch(`/usuarios/${id}`, usuario);

      if (response.status === 200) voltarTela();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setMensagemErro(error.response.data.message);
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={atualizarUsuario}>
      <h2>Editar usuario</h2>
      <div>
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

export default AtualizaUsuario;
