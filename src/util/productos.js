import api from "./axios";

const filtroProdu = async (filtros) => {
    const response = await api.post(`/api/productos-filtro`, filtros);
    return response.data;
  };

  export { filtroProdu };