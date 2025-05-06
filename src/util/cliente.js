import api from "./axios";

//Productos



//Solicitudes
  const mySolicitudesCliente = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await api.get(`/api/my-solicitudes-cliente/${user.id}`);
    return response.data;
  };

//Filtros
  const filtroSoliCliente = async (filtros) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user.id);
    filtros.cliente_id = user.id;
    console.log('filtro helper', filtros)
    const response = await api.post(`/api/solicitudes-filtro`, filtros);
    console.log(response.data);
    return response.data;
  };


export {mySolicitudesCliente, filtroSoliCliente};