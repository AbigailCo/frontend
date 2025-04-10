import { getStorage } from "./axios";

export const initApp = (actions) => {
    const stored = getStorage();
    if (stored) actions.setStore(stored);
  };
  