import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { disableUser } from "../../../../util/admin";
import { toast } from "react-toastify";

const Index = ({ users }) => {
  const nav = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleEdit = (id) => {
    nav("/usuario-edit/" + id);
  };

  const handleDisable = async (id) => {
    setLoading(true);
    setErrors({});

    try {
      await disableUser(id);
      setLoading(false);
      toast.success("Usuario deshabilitado correctamente");
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        console.error("Error inesperado:", error);
        toast.error("Hubo un problema al deshabilitar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Rol</th>
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {user.roles && user.roles.length > 0
                  ? user.roles.join(", ")
                  : "Sin rol"}
              </td>
              <td className="px-6 py-4 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    handleDisable(user.id)
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Dehabilitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
