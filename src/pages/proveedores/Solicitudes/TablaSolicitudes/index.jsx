import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  aprobarSoli,
  getSolicitud,
  rechazarSoli,
} from "../../../../util/solicitudes";
import { useNavigate } from "react-router-dom";
import * as C from "../../../../Components";

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
      console.log("solicitud", solicitud);
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
        `Solicitud ${
          accion === "aprobar" ? "aprobada" : "rechazada"
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

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase font-medium text-gray-600">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Contacto</th>
            <th className="px-6 py-3">Servicio/Producto</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3 text-center">Acciones</th>
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
                <td className="px-6 py-4">{solicitud.id}</td>
                <td className="px-6 py-4">{solicitud.cliente?.name}</td>
                <td className="px-6 py-4">{solicitud.cliente?.email}</td>
                <td className="px-6 py-4">{item?.nombre}</td>
                <td className="px-6 py-4">{item?.precio}</td>
                <td className="px-6 py-4">{item?.stock}</td>
                <td
                  className={`px-6 py-4 text-white ${
                    estadoNombre === "Pendiente"
                      ? "bg-yellow-500"
                      : estadoNombre === "Aprobada"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {estadoNombre}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleVer(solicitud.id)}
                    className="bg-violet-700 text-white px-3 py-1 rounded hover:bg-violet-800"
                    disabled={loading}
                  >
                    Ver
                  </button>
                  {estadoId === 4 || estadoId === 5 ? (
                    <button
                      onClick={() => handleAccion("rechazar", solicitud.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      disabled={loading}
                    >
                      Rechazar
                    </button>
                  ) : null}
                  {estadoId === 4 || estadoId === 6 ? (
                    <button
                      onClick={() => handleAccion("aprobar", solicitud.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
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
        <C.Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={solicitudSeleccionada.cliente?.nombre}
          aceptar={handleCloseModal}
          titleButton="Cerrar"
        >
          <div className="space-y-2 text-sm text-gray-700">
            <p
              className={
                solicitudSeleccionada.estado.nombre === "Aprobada"
                  ? "text-green-500"
                  : ""
              }
            >
              <strong>Estado de la solicitud:</strong>{" "}
              {solicitudSeleccionada.estado.nombre}
            </p>
            <p>
              <strong>Cliente:</strong> {solicitudSeleccionada.cliente?.nombre}
            </p>
            <p>
              <strong>Contacto:</strong>{" "}
              {solicitudSeleccionada.cliente?.contacto}
            </p>
            <p>
              <strong>Proveedor:</strong>{" "}
              {solicitudSeleccionada.proveedor?.nombre}
            </p>
            <p>
              <strong>Contacto:</strong>{" "}
              {solicitudSeleccionada.proveedor?.contacto}
            </p>
            {solicitudSeleccionada.servicio ||
            solicitudSeleccionada.producto ? (
              <>
                {(() => {
                  const item =
                    solicitudSeleccionada.servicio ||
                    solicitudSeleccionada.producto;
                  return (
                    <>
                      <p>
                        <strong>Servicio/Producto:</strong> {item?.nombre}
                      </p>
                      <p>
                        <strong>Codigo:</strong> {item?.codigo}
                      </p>
                      <p>
                        <strong>Precio:</strong> {item?.precio}
                      </p>
                      <p>
                        <strong>Stock:</strong> {item?.stock}
                      </p>
                    </>
                  );
                })()}
              </>
            ) : null}
          </div>
        </C.Modal>
      )}
    </div>
  );
};

export default Index;
