import api from "./axios";


const getUsers = async () => {
   
    const response = await api.get("/api/usuarios");
    console.log('que responde usuario', response);
    return response;
  };

export {getUsers}