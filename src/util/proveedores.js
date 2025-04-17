import api from "./axios";


const getProductos = async () => {
    const response = await api.get("/api/productos");
    console.log('respuesta del helper',response.data);
    return response;
};
const getServicios = async () => {
    const response = await api.get("/api/servicios");
    console.log('respuesta del helper',response.data);
    return response;
};

const getCategorias = async () => {
    const response = await api.get("/api/categorias");
  console.log(response.data);
    return response.data;
  };

const createProd = async (from) => {
    const response = await api.post("/api/create-producto", from);
    console.log('respuesta del helper',response.data);
    return response;
};
export {getProductos, getServicios, createProd, getCategorias}