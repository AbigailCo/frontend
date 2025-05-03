import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  aprobarSoli,
  getSolicitud,
  rechazarSoli,
} from "../../../../util/solicitudes";
import { useNavigate } from "react-router-dom";

import ModalSolicitud from "./ModalSolicitudes";

const Index = ({ solicitudes }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/tus-solicitudes");
  };

  const handleVer = async (id) => {
    setLoading(true);
    setErrors({});
    try {
      const solicitud = await getSolicitud(id);
      // console.log("solicitud", solicitud);
      setSolicitudSeleccionada(solicitud);
      setShowModal(true);
    } catch (error) {
      toast.error("Hubo un problema al obtener la solicitud.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccion = async (accion, id) => {
    setLoading(true);
    setErrors({});
    try {
      if (accion === "aprobar") await aprobarSoli(id);
      else await rechazarSoli(id);

      toast.success(
        `Solicitud ${accion === "aprobar" ? "aprobada" : "rechazada"
        } correctamente`
      );
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error(`Hubo un problema al ${accion} la solicitud.`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(solicitudes)
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
       <table className="min-w-full divide-y divide-gray-200 text-xs text-left text-gray-700">
    <thead className="bg-gray-100 uppercase font-semibold text-gray-600">
      <tr>
        <th className="px-2 py-1">Cliente</th>
        <th className="px-2 py-1">Contacto</th>
        <th className="px-2 py-1">Servicio/Producto</th>
        <th className="px-2 py-1">Precio</th>
        <th className="px-2 py-1">Stock</th>
        <th className="px-2 py-1">Fecha</th>
        <th className="px-2 py-1">Hora</th>
        <th className="px-2 py-1">Estado</th>
        <th className="px-2 py-1 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      {solicitudes?.map((solicitud) => {
        const estadoNombre =
          solicitud?.estado?.nombre || solicitud?.estado_general?.nombre;
        const estadoId =
          solicitud?.estado?.id || solicitud?.estado_general_id;
        const item = solicitud?.servicio || solicitud?.producto;

        return (
          <tr key={solicitud.id}>
            <td className="px-2 py-1">{solicitud.cliente?.nombre}</td>
            <td className="px-2 py-1">{solicitud.cliente?.contacto}</td>
            <td className="px-2 py-1">{item?.nombre}</td>
            <td className="px-2 py-1">${item?.precio}</td>
            <td className="px-2 py-1">{item?.stock}</td>
            <td className="px-2 py-1">{solicitud?.fecha_reserva || 'sin fecha'}</td>
            <td className="px-2 py-1">{solicitud?.hora_reserva || 'sin hora'}</td>
            <td
              className={`px-2 py-1 text-white text-center rounded ${
                estadoNombre === "Pendiente"
                  ? "bg-yellow-500"
                  : estadoNombre === "Aprobada"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {estadoNombre}
            </td>
            <td className="px-2 py-1 flex justify-center gap-1 flex-wrap">
              <button
                onClick={() => handleVer(solicitud.id)}
                className="bg-violet-700 text-white px-2 py-0.5 rounded text-xs hover:bg-violet-800"
                disabled={loading}
              >
                Ver
              </button>
              {estadoId === 4 || estadoId === 5 ? (
                <button
                  onClick={() => handleAccion("rechazar", solicitud.id)}
                  className="bg-red-500 text-white px-2 py-0.5 rounded text-xs hover:bg-red-600"
                  disabled={loading}
                >
                  Rechazar
                </button>
              ) : null}
              {estadoId === 4 || estadoId === 6 ? (
                <button
                  onClick={() => handleAccion("aprobar", solicitud.id)}
                  className="bg-green-500 text-white px-2 py-0.5 rounded text-xs hover:bg-green-600"
                  disabled={loading}
                >
                  Aprobar
                </button>
              ) : null}
            </td>
          </tr>
        );
      })}
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
