import styles from "./Button.module.css";

function Button({ type, text, handleOnClick }) {
  return (
    <div className={styles.divButtons}>
      <input className={styles.input_submit} type="submit" value="Cadastrar" />
    </div>
  );
}

export default Button;
