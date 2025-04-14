import { getStorage } from "./axios";

export const initApp = (actions) => {
    const stored = getStorage();
    //console.log("init app que guarda:", stored); 
    if (stored) actions.setStore(stored);
  };
  