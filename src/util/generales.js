import api from "./axios";

//Generales
const getCategorias = async () => {
    const response = await api.get("/api/categorias");
    return response.data.data;
  };
  
const getDiasSemana = async () => {
    const response = await api.get(`/api/dias-semana`);
    return response.data.data;
  }

export { getDiasSemana, getCategorias };