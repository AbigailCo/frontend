import { useState } from "react";
//import api from "../axios";
import { useNavigate } from "react-router-dom"; 
import { forgotpassword } from "../../../util/axios";
import * as C from "../../../Components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus("");

   try {
         await forgotpassword(email);
         Navigate("/"); // o a donde quieras redirigir después de registrarse
       } catch (error) {
         // Asume que la API devuelve un objeto con `errors`
         if (error.errors) {
           setErrors(error.errors);
         } else {
           console.error("Error inesperado:", error);
         }
       } finally {
         setLoading(false);
       }
  };

  return (
    
      <C.contenedor linkBack = "-1">
<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
      {status && <p className="text-green-600 mb-4">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>
        <button className="bg-violet-600 text-white w-full py-2 rounded hover:bg-violet-700 transition">
        {loading ? "Enviando..." : "Enviar Enlace"}
        </button>
      </form>
    </div>
      </C.contenedor>

    
  );
};

export default ForgotPassword;
