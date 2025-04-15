import React, { useContext, useState } from "react";

import * as C from "../../../Components";

import { Link,  useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import { login } from "../../../util/user";

function Login() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("12345678");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { actions: ua } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
  
      const userData = await login(email, password); // viene del helper
      setUser(userData); 
      ua.setStore({
        user: userData
      });
  
      nav("/panel");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas o error de conexión.");
    }
    setLoading(false);
  };


  return (
    <C.Contenedor >
      <div  className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">Iniciar sesion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
        <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
           <label className="block font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit" disabled={loading} className="bg-violet-600 text-white w-full py-2 rounded hover:bg-violet-700 transition">
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Link
            to="/forgot-password"
            className="text-sm text-violet-600 hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </Link>
        </form>
        <Link
            to="/registro"
            className="text-sm text-violet-600 hover:underline"
          >
            registrarse
          </Link>
      </div>
    </C.Contenedor>
  );
}
export default Login;
