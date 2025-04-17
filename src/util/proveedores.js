import api from "./axios";


const getCategorias = async () => {
  const response = await api.get("/api/categorias");
  console.log(response.data);
  return response.data;
};

//Productos
const getProductos = async () => {
  const response = await api.get("/api/productos");
  console.log("respuesta del helper", response.data);
  return response;
};
const myProductos = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log('que responde user', user);
  const response = await api.get(`/api/my-productos/${user.id}`);
  console.log("respuesta del helper", response.data);
  return response;
};

const getProducto = async (id) => {
  const response = await api.get(`/api/producto/${id}`);
  console.log(response.data);
  return response.data;
};
const editProd = async (form, id) => {

  const response = await api.post(
    `/api/producto/${id}/edit`,
    form, {id});

  return response;
};
const createProd = async (from) => {
  const response = await api.post("/api/create-producto", from);
  console.log("respuesta del helper", response.data);
  return response;
};

const disableProd = async (id) => {
  const response = await api.post(
    `/api/producto/${id}/deshabilitar`, {id});
  return response;
};

const enableProd = async (id) => {
  const response = await api.post(
    `/api/producto/${id}/habilitar`, {id});
  return response;
};

//SERVICIOS
const getServicios = async () => {
  const response = await api.get("/api/servicios");
  console.log("respuesta del helper", response.data);
  return response;
};
const myServicios = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log('que responde user', user);
  const response = await api.get(`/api/my-servicios/${user.id}`);
  console.log("respuesta del helper", response.data);
  return response;
};
const getServicio = async (id) => {
  const response = await api.get(`/api/servicio/${id}`);
  console.log(response.data);
  return response.data;
};

const createServ = async (from) => {
  const response = await api.post("/api/create-servicio", from);
  console.log("respuesta del helper", response.data);
  return response;
};
const editServ = async (form, id) => {
  const response = await api.post(
    `/api/servicio/${id}/edit`,
    form, {id});
  return response;
};

const disableServ = async (id) => {
  const response = await api.post(
    `/api/servicio/${id}/deshabilitar`, {id});
  return response;
};

const enableServ = async (id) => {
  const response = await api.post(
    `/api/servicio/${id}/habilitar`, {id});
  return response;
};
export {
  getProductos,
  getServicios,
  createProd,
  getCategorias,
  createServ,
  getProducto,
  getServicio,
  editProd,
  editServ,
  disableProd,
  enableProd,
  enableServ,
  disableServ,
  myProductos,
  myServicios
};
