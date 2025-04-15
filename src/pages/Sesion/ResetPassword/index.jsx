import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetpassword } from "../../../util/user";


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    token: searchParams.get("token") || "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log ('formulario',form)
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
        await resetpassword(form);
      navigate("/login");
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="token" value={form.token} />
        
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        <div>
          <label>Nueva contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        <div>
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="password_confirmation"
            className="w-full border p-2 rounded"
            value={form.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-violet-600 text-white w-full py-2 rounded hover:bg-violet-700 transition"
        >
          {loading ? "Guardando..." : "Guardar nueva contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
