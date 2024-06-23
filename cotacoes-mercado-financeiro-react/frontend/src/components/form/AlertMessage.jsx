import styles from "./AlertMessage.module.css";

function AlertMessage({ showMessage, textMessage }) {
  return (
    <div className={styles.div_alert}>
      {showMessage ? <p>* {textMessage}</p> : <span></span>}
    </div>
  );
}

export default AlertMessage;
