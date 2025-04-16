import api from "./axios";


const getUsers = async () => {
    const response = await api.get("/api/usuarios");
    console.log(response.data);
    return response;
};
const getUser = async (id) => {
  const response = await api.get( `/api/usuario/${id}`);
  console.log(response.data);
  return response.data;
};


const editUser = async (form, id) => {

  const response = await api.post(
    `/api/usuario/${id}/edit`,
    form, {id});

  return response;
};

const disableUser = async (id) => {

  const response = await api.post(
    `/api/usuario/${id}/deshabilitar`, {id});

  return response;
};

const enableUser = async (id) => {

  const response = await api.post(
    `/api/usuario/${id}/habilitar`, {id});

  return response;
};

export {getUsers, disableUser, editUser, getUser, enableUser}