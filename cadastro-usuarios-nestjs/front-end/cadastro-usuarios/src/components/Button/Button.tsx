import styles from "./Button.module.css";

interface PropsButton {
  text: { caption: string };
  onClick: () => void;
}

const Button = ({ text, onClick }: PropsButton) => {
  return (
    <button className={styles.buttonDefault} onClick={onClick}>
      {text.caption}
    </button>
  );
};

export default Button;
