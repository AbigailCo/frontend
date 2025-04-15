import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getUser = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const editUser = async (form) => {
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

export const login = async (email, password) => {
  //console.log("Login", email, password);
  //await api.get("/sanctum/csrf-cookie");
  const response = await api.post("/login", { email, password });
  //console.log("Response del login", response);
  const token = response.data.token;
  const user = response.data.user;
  //console.log(user, ".......");
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return response.data.user;
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation: password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const forgotpassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
   // console.log("que hay ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resetpassword = async ({
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

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    clearStorage();
    delete api.defaults.headers.common["Authorization"];

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// utils/localStorage.js

export const getStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (!user || !token) return null;
  return { user, token };
};

export const setStorage = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const clearStorage = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
  localStorage.removeItem("user");  
};

export default api;
