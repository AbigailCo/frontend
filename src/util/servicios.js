import api from "./axios";

//SERVICIOS
const filtroServi = async (filtros) => {
  const response = await api.post(`/api/servicios-filtro`, filtros);
  return response.data;
};

const getServiciosHabi = async (page) => {
  const response = await api.get("/api/servicios-habi", {
    params: { page }, 
  });
  return response.data;
};
const getServicios = async () => {
  const response = await api.get("/api/servicios");
  return response;
};
const myServicios = async (page = 1) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await api.get(`/api/my-servicios/${user.id}`, {
    params: { page }, 
  });
  return response.data;
};
const getServicio = async (id) => {
  const response = await api.get(`/api/servicio/${id}`);
  return response.data;
};

const createServ = async (form) => {
  const user = JSON.parse(localStorage.getItem("user"));
  form.proveedor_id = user.id;

  const payload = () => {
    if (form.categoria_id === "4") {
      return {
        ...form,
        fecha_vencimiento: form.fecha_vencimiento,
      };
    }else if (form.categoria_id === "5") {
      const fecha_inicio = new Date(form.fecha_inicio)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const fecha_fin = new Date(form.fecha_fin)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      return {
        ...form,
        fecha_inicio,
        fecha_fin,
      }

    }else if (form.categoria_id === "6") {
      const dias_disponibles = (form.dias_disponibles || []).map((d) => Number(d));
      const horarios = Array.isArray(form.horarios)
        ? form.horarios
        : typeof form.horarios === "string"
        ? form.horarios.split(",").map((h) => h.trim())
        : [];
      return {
        ...form,
        dias_disponibles,
        horarios,
      }
    }else {
      // Por si no es ninguna de las anteriores
      return { ...form };
    }

  }

  const response = await api.post("/api/create-servicio", payload());
  return response;
};
const editServ = async (form, id) => {
  const response = await api.post(`/api/servicio/${id}/edit`, form, { id });
  return response;
};

const disableServ = async (id) => {
  const response = await api.post(`/api/servicio/${id}/deshabilitar`, { id });
  return response;
};

const enableServ = async (id) => {
  const response = await api.post(`/api/servicio/${id}/habilitar`, { id });
  return response;
};

export {
  getServiciosHabi,
  filtroServi,
  editServ,
  createServ,
  getServicio,
  disableServ,
  enableServ,
  getServicios,
  myServicios,
};
