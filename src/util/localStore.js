const getStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) return null;
    return { user, token };
};
  
const setStorage = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
};
  
const clearStorage = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("user");  
};

export { getStorage, setStorage, clearStorage };