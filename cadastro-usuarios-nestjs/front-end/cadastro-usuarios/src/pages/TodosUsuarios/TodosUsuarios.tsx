import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";

const TodosUsuarios = () => {
  const navigate = useNavigate();

  function navegarNovoUsuario() {
    navigate("/novousuario");
  }

  return (
    <>
      <h1>Usuários Cadastrados</h1>
      <Button text={{ caption: "Novo usuário" }} onClick={navegarNovoUsuario} />
      <ListaUsuarios />
    </>
  );
};

export default TodosUsuarios;
