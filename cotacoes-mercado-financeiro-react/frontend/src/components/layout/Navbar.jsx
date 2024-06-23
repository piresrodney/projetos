import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Context } from "../../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { authenticated, logout } = useContext(Context);

  function showPageNewStock() {
    navigate("/newstock");
  }

  function handleLogout() {
    logout();
  }

  return (
    <nav className={styles.navegation}>
      <p>
        <span></span>
      </p>
      <p>Cotação de Ativos</p>
      {sessionStorage.getItem("authorized") === "true" ? (
        <div>
          <button
            type="button"
            className={styles.newStockButton}
            onClick={showPageNewStock}
          >
            Novo ativo
          </button>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <span></span>
      )}
    </nav>
  );
};

export default Navbar;
