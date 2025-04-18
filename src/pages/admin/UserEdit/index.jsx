import React, { useEffect, useState } from "react";

import * as C from "../../../Components";
import { editUser, getRoles, getUser } from "../../../util/admin";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Index = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);
        // console.log(userData,)
        const { name, email } = userData;
        setFormData((prev) => ({ ...prev, name, email, role: roles[0] || "" }));
        setUser(userData);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
       // console.log('......', rolesData);
      } catch (err) {
        console.error("Error al obtener roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await editUser(formData, id);
      const updatedUser = await getUser(id);
      toast.success("Usuario deshabilitado correctamente");
      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
        password: "",
        password_confirmation: "",
      });
      setUser(updatedUser);
      nav("/usuarios");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        toast.error("Ocurrió un error al actualizar el perfil");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <C.Contenedor linkBack="-1">
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Editar perfil de {user.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">
              Nombre
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Contraseña (dejar vacío si no deseas cambiarla)
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block font-medium text-gray-700"
              htmlFor="password_confirmation"
            >
              Confirmar contraseña
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700" htmlFor="role">
              Cambiar rol
            </label>
            <select
              id="role"
              name="role"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Seleccione un rol</option>
              {roles.length > 0 &&
                roles.map((role) => (
                  <option key={role.id} value={role.nombre}>
                    {role.nombre}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </div>
    </C.Contenedor>
  );
};

export default Index;
