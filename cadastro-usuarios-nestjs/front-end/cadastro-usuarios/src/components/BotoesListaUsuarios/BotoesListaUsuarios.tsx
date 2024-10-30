import styles from "./BotoesListaUsuarios.module.css";

interface PropriedadesBotao {
  text: { caption: string };
  onClick: () => void;
}

const BotoesListaUsuarios = ({ text, onClick }: PropriedadesBotao) => {
  return (
    <button className={text.caption === 'Editar' ? styles.botao : styles.excluir} onClick={onClick}>
      {text.caption}
    </button>
  );
};

export default BotoesListaUsuarios;
// styles.botao