import api from "./axios";


const getProductos = async () => {
    const response = await api.get("/api/productos");
    console.log('respuesta del helper',response.data);
    return response;
};

export {getProductos}