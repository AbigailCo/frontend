import api from "./axios";

const getTurnos = async () => {
    const response = await api.get("/api/turnos");
    return response.data;
};

export { getTurnos };