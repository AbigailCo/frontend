import api from "./axios";

const filtroProdu = async (filtros) => {
    const response = await api.post(`/api/productos-filtro`, filtros);
    return response.data;
  };
  //Productos
const getProductos = async () => {
  const response = await api.get("/api/productos");
  return response;
};
const myProductos = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await api.get(`/api/my-productos/${user.id}`);
  return response.data;
};

const getProducto = async (id) => {
  const response = await api.get(`/api/producto/${id}`);
  return response.data.data;
};
const editProd = async (form, id) => {
  const response = await api.post(
    `/api/producto/${id}/edit`,
    form, {id});
  return response;
};
const createProd = async (form) => {
  const user = JSON.parse(localStorage.getItem("user"));
  form.proveedor_id = user.id;
  const response = await api.post("/api/create-producto", form);
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
const getProductosHabi = async () => {
  const response = await api.get("/api/productos-habi");
  return response;
};
  export { filtroProdu, getProducto, editProd, createProd, disableProd, enableProd, getProductos, myProductos, getProductosHabi };