import api from "./axios";

const filtroServi = async (filtros) => {
  const response = await api.post(`/api/servicios-filtro`, filtros);
  console.log(response.data);
  return response.data;
};

const getDiasSemana = async () => {
  const response = await api.get(`/api/dias-semana`);
  console.log(response.data);
  return response.data;
}
export { filtroServi, getDiasSemana };
