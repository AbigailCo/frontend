import api from "./axios";
const filtroSoliProve = async (filtros) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user.id);
  filtros.proveedor_id = user.id;
  // console.log('filtro helper', filtros)
  const response = await api.post(`/api/solicitudes-filtro`, filtros);
  // console.log(response.data);
  return response.data;
};
export {

  filtroSoliProve
};
