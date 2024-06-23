import { createContext } from "react";

import useAuthentication from "../hooks/useAuthentication";

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, login, messageException, logout, userLogged } =
    useAuthentication();

  return (
    <Context.Provider
      value={{ authenticated, login, messageException, logout, userLogged }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
