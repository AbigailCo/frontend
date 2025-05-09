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
  const mySolicitudesCliente = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('que responde user', user);
    const response = await api.get(`/api/my-solicitudes-cliente/${user.id}`);
    console.log("respuesta del helper", response.data);
    return response;
  };

export {getProductosHabi, getServiciosHabi, mySolicitudesCliente}