import api from "./axios";

const createSolicitud = async (from) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user.id);
  from.cliente_id = user.id;

  console.log("que trae el form", from);

  const response = await api.post("/api/create-solicitud", from);
  console.log("respuesta del helper", response.data);
  return response;
};


const rechazarSoli = async (id) => {
  const response = await api.post(
    `/api/solicitud/${id}/rechazar`, {id});
  return response;
};

const aprobarSoli = async (id) => {
  const response = await api.post(
    `/api/solicitud/${id}/aprobar`, {id});
  return response;
};


const getSolicitud = async (id) => {
  const response = await api.get(`/api/solicitud/${id}`);
  console.log(response.data);
  return response.data;
};

const filtroSoli = async (filtros) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user.id);
  filtros.proveedor_id = user.id;
  const response = await api.post(`/api/solicitudes-filtro`, filtros);
  console.log(response.data);
  return response.data;
};
export { createSolicitud, rechazarSoli, aprobarSoli, getSolicitud , filtroSoli};
