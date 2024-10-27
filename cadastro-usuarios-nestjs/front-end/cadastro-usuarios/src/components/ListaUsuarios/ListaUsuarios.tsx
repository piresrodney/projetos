import React, { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./ListaUsuarios.module.css";
import BotoesListaUsuarios from "../BotoesListaUsuarios/BotoesListaUsuarios";
import { Link, useNavigate } from "react-router-dom";

interface Usuarios {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Usuarios[]>("/usuarios").then((response) => {
      setUsuarios(response.data);
      return;
    });
  }, []);

  async function excluirUsuario(id: number) {
    await api.delete(`/usuarios/${id}`).then(() => {
      const usuariosAtualizado = usuarios.filter((u) => u.id !== id);
      setUsuarios(usuariosAtualizado);
    });
  }

  return (
    <section className={styles.section}>
      {usuarios.map((usuario) => (
        <div key={usuario.id} className={styles.usuarios}>
          <div className={styles.usuariosInterno}>
            <h2 className={styles.link}>
              <Link to={`/atualizausuario/${usuario.id}`}>{usuario.nome}</Link>
            </h2>
            <p>E-mail: {usuario.email}</p>
            {usuario.endereco !== "" ? (
              <p>Endereço: {usuario.endereco}</p>
            ) : null}
            {usuario.telefone !== "" ? (
              <p>Telefone: {usuario.telefone}</p>
            ) : null}
          </div>
          <div>
            <BotoesListaUsuarios
              text={{ caption: "Editar" }}
              onClick={() => (
                navigate(`/atualizausuario/${usuario.id}`)
              )}
            />
            <BotoesListaUsuarios
              text={{ caption: "Excluir" }}
              onClick={() => excluirUsuario(usuario.id)}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListaUsuarios;
