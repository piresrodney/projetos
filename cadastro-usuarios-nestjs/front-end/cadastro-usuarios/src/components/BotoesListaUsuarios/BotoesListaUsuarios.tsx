import styles from "./BotoesListaUsuarios.module.css";

interface PropriedadesBotao {
  text: { caption: string };
  onClick: () => void;
}

const BotoesListaUsuarios = ({ text, onClick }: PropriedadesBotao) => {
  return (
    <button className={styles.botao} onClick={onClick}>
      {text.caption}
    </button>
  );
};

export default BotoesListaUsuarios;
