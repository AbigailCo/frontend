import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../util/axios"; 
import * as C from "../../../Components";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (error) {
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
    <C.Contenedor linkBack="-1" >
<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">Registrarse</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Confirmar contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
    </C.Contenedor>
    
  );
};

export default RegisterForm;
