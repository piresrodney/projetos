import { useEffect, useState } from "react";

import api from "../../utils/api";

import styles from "./StocksList.module.css";

import removeImageBlack from "../../../public/remove.png";
import removeImageWhite from "../../../public/removeWhite.png";

const StocksList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const idUser = sessionStorage.getItem("idUser");

    const fetchStocks = async () => {
      try {
        const responseApi = await api.patch("/stocks", { idUser });
        setStocks(responseApi.data.stocksView);
      } catch (error) {
        alert("Houve um erro ao tentar processar dados da api");
        return;
      }
    };

    fetchStocks();

    const interval = setInterval(fetchStocks, 600000);

    return () => clearInterval(interval);
  }, []);

  async function removeStock(tagStock) {
    if (!confirm(`Confirma a exclusão do ativo "${tagStock}"?`)) {
      return;
    }

    try {
      const data = await api
        .delete(`/stocks/removestock/${tagStock}`)
        .then(() => {
          const refreshStocks = stocks.filter(
            (stock) => stock.tag !== tagStock
          );
          setStocks(refreshStocks);
        });
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <ul>
      {stocks &&
        stocks.map((stock) => (
          <li
            key={stock.id}
            style={
              stock.perc.replace(",", ".") > 0.0
                ? { backgroundColor: "#42942F", color: "#FFF" }
                : stock.perc.replace(",", ".") < 0.0
                ? { backgroundColor: "#BE2929", color: "#FFF" }
                : { backgroundColor: "#FFF", color: "#000" }
            }
          >
            <div className={styles.external_div}>
              <div className={styles.header_div}>
                <p className={styles.stock_info}>{stock.tag}</p>
                <p className={styles.stock_perc} id={`${stock.tag}_perc`}>
                  {stock.perc}%
                </p>
                <img
                  src={
                    stock.perc.replace(",", ".") > 0.0 ||
                    stock.perc.replace(",", ".") < 0.0
                      ? removeImageWhite
                      : removeImageBlack
                  }
                  alt="removeImage"
                  title="Clique para excluir o ativo"
                  onClick={() => removeStock(stock.tag)}
                />
              </div>
              <div className={styles.footer_div}>
                <p className={styles.stock_name}>{stock.name}</p>
                <p className={styles.stock_info}>R$ {stock.price}</p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default StocksList;
