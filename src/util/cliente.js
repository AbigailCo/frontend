import api from "./axios";

//Productos
const getProductosHabi = async () => {
    const response = await api.get("/api/productos-habi");
    console.log("respuesta del helper", response.data);
    return response;
  };

  const getServiciosHabi = async () => {
    const response = await api.get("/api/servicios-habi");
    console.log("respuesta del helper", response.data);
    return response;
  };


export {getProductosHabi, getServiciosHabi}