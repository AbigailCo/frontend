import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

// Leer token del localStorage (si existe)
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const getUser = async () => {
  return api.get("/api/prueba");
};



export const login = async (email, password) => {
  console.log("Login", email, password);
  const tok = await api.get("/sanctum/csrf-cookie");
  console.log('daaa', tok)
  const response = await api.post("/login", { email, password });

  const token = response.data.token;
  localStorage.setItem("token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return response.data;
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
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resetpassword = async ({ email, token, password, password_confirmation }) => {
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
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
  
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };
export default api;
