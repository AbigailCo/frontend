import { createContext, useState } from "react";
import { getStorage, setStorage } from "../util/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [store, setStore] = useState(getStorage());

  const actions = {
    setStore: (data) => {
      setStore(data);
      setStorage(data);
    },
    persona: () => store?.persona || null,
  };

  return (
    <UserContext.Provider value={{ store, actions }}>
      {children}
    </UserContext.Provider>
  );
};
