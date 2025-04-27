import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  getSolicitud,
} from "../../../../util/solicitudes";
import { useNavigate } from "react-router-dom";
import * as C from "../../../../Components";
import ModalSolicitud from "./ModalSolicitudes";

const Index = ({ solicitudes }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/tus-solicitudes-cliente");
  };

  const handleVer = async (id) => {
    console.log("id", id);
    setLoading(true);
    setErrors({});

    try {
      const solicitud = await getSolicitud(id);
      setLoading(false);
      setSolicitudSeleccionada(solicitud);
      setShowModal(true);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        console.error("Error inesperado:", error);
        toast.error("Hubo un problema al rechazar la solicitud.");
      }
    } finally {
      setLoading(false);
    }
  };


console.log("solicitudSeleccionada", solicitudSeleccionada);
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Contacto</th>
            <th className="px-6 py-3">servicio/producto</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Estado</th>

            {/* <th className="px-6 py-3">Categoria</th> */}
            <th className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {solicitudes?.map((solicitud) => (
            <tr key={solicitud?.id}>
              <td className="px-6 py-4">{solicitud?.id}</td>
              <td className="px-6 py-4">{solicitud?.cliente?.nombre}</td>
              <td className="px-6 py-4">{solicitud?.cliente?.contacto}</td>
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
              {solicitud?.estado?.nombre === 'Pendiente' ? (
                <td className="px-6 py-4 bg-yellow-500 text-white">{solicitud?.estado?.nombre}</td>
              ) : (
                <td className={solicitud?.estado?.nombre === 'Aprobada' ? 'text-white px-6 py-4 bg-green-500' : 'text-white bg-red-500 px-6 py-4'}>{solicitud?.estado?.nombre}</td>
              )}
             
              <td className="px-6 py-4 flex justify-center gap-2">
                <button
                  onClick={() => handleVer(solicitud.id)}
                  className="bg-violet-700 text-white px-3 py-1 rounded hover:bg-violet-800"
                  disabled={loading}
                >
                  ver
                </button>
           
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && solicitudSeleccionada && (
        <ModalSolicitud isOpen={showModal}
        onClose={handleCloseModal}
        aceptar={handleCloseModal}
        solicitud={solicitudSeleccionada}
      />
      )}
    </div>
  );
};

export default Index;
