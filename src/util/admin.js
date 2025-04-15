import api from "./axios";


const getUsers = async () => {
    const response = await api.get("/api/usuarios");
    return response;
};
const getUser = async (id) => {
  const response = await api.get( `/api/usuario/${id}`);
  return response.data;
};


const editUser = async (form, id) => {

  const response = await api.post(
    `/api/usuario/${id}/edit`,
    form, {id});

  return response;
};

export {getUsers, editUser, getUser}