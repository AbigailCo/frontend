import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { disableUser, enableUser } from "../../../../util/admin";
// import { toast } from "react-toastify";
// import { disableServ, enableServ } from "../../../../util/proveedores";

const Index = ({ solicitudes }) => {
  // const nav = useNavigate();
  // const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);

  /*  const handleEdit = (id) => {
     nav("/servicio-edit/" + id);
   }; */

  /*  const handleDisable = async (id) => {
      setLoading(true);
      setErrors({});
  
      try {
        await disableServ(id);
        setLoading(false);
        toast.success("Servicio deshabilitado correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          console.error("Error inesperado:", error);
          toast.error("Hubo un problema al deshabilitar el servicio.");
        }
      } finally {
        setLoading(false);
      }
    };
    const handleEnable = async (id) => {
      setLoading(true);
      setErrors({});
  
      try {
        await enableServ(id);
        setLoading(false);
        toast.success("Servicio habilitado correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          console.error("Error inesperado:", error);
          toast.error("Hubo un problema al habilitar el servicio.");
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
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Contacto</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Stock</th>

            {/* <th className="px-6 py-3">Categoria</th> */}
            {/* <th className="px-6 py-3 text-center">Acciones</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {solicitudes?.map((solicitud) => (
            <tr key={solicitud?.id}>
              <td className="px-6 py-4">{solicitud?.id}</td>
              <td className="px-6 py-4">{solicitud?.cliente?.name}</td>
              <td className="px-6 py-4">{solicitud?.cliente?.email}</td>
              {solicitud?.servicio?.nombre ? (
                <td className="px-6 py-4">{solicitud?.servicio?.nombre}</td>
              ) : (
                <td className="px-6 py-4">{solicitud?.producto?.nombre}</td>
              )}
             
             
              {solicitud?.servicio?.precio ? (
                <td className="px-6 py-4">{solicitud?.servicio?.precio}</td>
              ) : (
                <td className="px-6 py-4">{solicitud?.producto?.precio}</td>
              )}
              {solicitud?.servicio?.stock ? (
                <td className="px-6 py-4">{solicitud?.servicio?.stock}</td>
              ) : (
                <td className="px-6 py-4">{solicitud?.producto?.stock}</td>
              )}
              {/* <td className="px-6 py-4">{servicio.stock}</td>
              <td  className="px-6 py-4">{servicio.categoria.nombre}</td>
             <td className="px-6 py-4 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(servicio.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                { servicio?.estado_general_id === 1 ? (
                    <button
                      onClick={() => handleDisable(servicio.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={loading}
                    >
                      Deshabilitar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnable(servicio.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      disabled={loading}
                    >
                      Habilitar
                    </button>
                  )
                }
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
