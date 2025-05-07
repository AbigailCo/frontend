import api from "./axios";

const createSolicitud = async (from) => {

  const user = JSON.parse(localStorage.getItem("user"));
  from.cliente_id = user.id;
  console.log("desde la api", from);
  const response = await api.post("/api/create-solicitud", from);
  return response;
};


 const fetchHorariosReservados  = async (id, fechaSeleccionada) => {
  const response = await api.get(`/api/servicios/${id}/horarios-reservados`, {
    params: { fecha: fechaSeleccionada.toISOString().split("T")[0] }
  });

  return response.data;
 }

 const mySolicitudes = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await api.get(`/api/my-solicitudes/${user.id}`);
  return response.data;
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

  return response.data;
};


export { createSolicitud, rechazarSoli, aprobarSoli, getSolicitud, fetchHorariosReservados, mySolicitudes };
