import styles from "./Button.module.css";

interface PropsButton {
  text: { caption: string };
  onClick: () => void;
}

const Button = ({ text, onClick }: PropsButton) => {
  return (
    <button
      className={
        text.caption === "Gravar" || text.caption === "Novo usuário"
          ? styles.buttonDefault
          : styles.buttonVoltar
      }
      onClick={onClick}
    >
      {text.caption}
    </button>
  );
};

export default Button;
