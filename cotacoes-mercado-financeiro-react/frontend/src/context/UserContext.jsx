import { createContext } from "react";

import useAuthentication from "../hooks/useAuthentication";

const Context = createContext();

function UserProvider({ children }) {
  const {
    authenticated,
    login,
    messageException,
    logout,
    userLogged,
    registerUser,
  } = useAuthentication();

  return (
    <Context.Provider
      value={{
        authenticated,
        login,
        messageException,
        logout,
        userLogged,
        registerUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
