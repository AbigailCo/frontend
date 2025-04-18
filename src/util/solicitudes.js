import api from "./axios";

const createSolicitud = async (from) => {
  const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user.id);
    from.cliente_id = user.id
   


    console.log("que trae el form", from);

    const response = await api.post("/api/create-solicitud", from);
    console.log("respuesta del helper", response.data);
    return response;
  };

  export {createSolicitud}