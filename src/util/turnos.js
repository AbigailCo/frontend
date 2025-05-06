import api from "./axios";

const getTurnos = async () => {
    const response = await api.get("/api/turnos");
    console.log("respuesta del helper", response.data);
    return response;
  };

export { getTurnos };