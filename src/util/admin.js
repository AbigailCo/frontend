import api from "./axios";


const getUsers = async () => {
    const response = await api.get("/api/usuarios");
    return response.data.data;
};
const getUser = async (id) => {
  const response = await api.get( `/api/usuario/${id}`);
  console.log(response.data);
  return response.data.data;
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
const getEstados = async () => {
  const response = await api.get("/api/estados");
  console.log(response.data);
  return response;
};
const getRoles = async () => {
  const response = await api.get("/api/roles");
//  console.log(response.data);
  return response.data;
};

const registerUser = async (name, email, password, role) => {
  try {
    const response = await api.post("/api/register-user", {
      name,
      email,
      password,
      password_confirmation: password,
      role,
    });
   
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export {getUsers, disableUser, editUser, getUser, enableUser, getEstados, getRoles, registerUser}