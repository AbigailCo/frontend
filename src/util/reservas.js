import api from "./axios";

const getReservas = async () => {
    const response = await api.get("/api/reservas");
    return response.data;
};

export { getReservas };