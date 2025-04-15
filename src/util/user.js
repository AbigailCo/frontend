import api from "./axios";
import { clearStorage, getStorage } from "./localStore";

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const getUser = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


 const editUser = async (form) => {
  const data = getStorage();
  const id = data.user.id;
  const token = data.token;

  const response = await api.post(
    `/api/edit-user/${id}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  const token = response.data.token;
  const user = response.data.user;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data.user;
};

const register = async (name, email, password) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation: password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    const user = response.data.user;
    localStorage.setItem("user", JSON.stringify(user));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const forgotpassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const resetpassword = async ({
  email,
  token,
  password,
  password_confirmation,
}) => {
  try {
    const response = await api.post("/reset-password", {
      email,
      token,
      password,
      password_confirmation,
    });
    const newToken = response.data.token;
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const logout = async () => {
  try {
    const response = await api.post("/logout");
    clearStorage();
    delete api.defaults.headers.common["Authorization"];

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export { login, register, logout, getUser, editUser, forgotpassword, resetpassword };