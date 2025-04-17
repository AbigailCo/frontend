import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
// import { disableUser, enableUser } from "../../../../util/admin";
// import { toast } from "react-toastify";

const Index = ({ productos }) => {
  const nav = useNavigate();
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleEdit = (id) => {
    nav("/producto-edit/" + id);
  };

 /*  const handleDisable = async (id) => {
    setLoading(true);
    setErrors({});

    try {
      await disableUser(id);
      setLoading(false);
      toast.success("Usuario deshabilitado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
  const handleEnable = async (id) => {
    setLoading(true);
    setErrors({});

    try {
      await enableUser(id);
      setLoading(false);
      toast.success("Usuario habilitado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        console.error("Error inesperado:", error);
        toast.error("Hubo un problema al habilitar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };
 */
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Descripcion</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Stock</th>

            <th className="px-6 py-3">Categoria</th>
            {/* <th className="px-6 py-3 text-center">Acciones</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {productos?.map((producto) => (
            <tr key={producto.id}>
              <td className="px-6 py-4">{producto.id}</td>
              <td className="px-6 py-4">{producto.nombre}</td>
              <td className="px-6 py-4">{producto.descripcion}</td>
              <td className="px-6 py-4">{producto.precio}</td>
              <td className="px-6 py-4">{producto.stock}</td>
              <td  className="px-6 py-4">{producto.categoria.nombre}</td>
             <td className="px-6 py-4 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(producto.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                {/* {!producto?.roles?.includes("admin") && (
                  user?.estado_general_id === 1 ? (
                    <button
                      onClick={() => handleDisable(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={loading}
                    >
                      Deshabilitar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnable(user.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      disabled={loading}
                    >
                      Habilitar
                    </button>
                  )
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
