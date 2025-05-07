import React, { useState } from "react";
import { createSolicitud } from "../../../util/solicitudes";
import { toast } from "react-toastify";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as C from "../../../Components";

const ModalSolicitud = ({ servicio, isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [rangoFechas, setRangoFechas] = useState([
    {
      startDate: new Date(servicio.fecha_inicio),
      endDate: new Date(servicio.fecha_fin),
      key: "selection",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const fechaInicio = new Date(servicio.fecha_inicio);
  const fechaFin = new Date(servicio.fecha_fin);

  const handleSolicitar = async () => {
    const { startDate, endDate } = rangoFechas[0];

    if (!startDate || !endDate) {
      toast.error("Selecciona un rango de fechas válido.");
      return;
    }

    try {
      await createSolicitud({
        proveedor_id: servicio.proveedor_id,
        servicio_id: servicio.id,
        fecha_inicio_reserva: startDate.toISOString().split("T")[0],
        fecha_fin_reserva: endDate.toISOString().split("T")[0],
      });

      toast.success("Solicitud enviada correctamente");
      setShowModal(true);
    } catch (error) {
      toast.error("Error al enviar solicitud");
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <C.Modal
      title={servicio.nombre}
      aceptar={handleSolicitar}
      titleButton="Solicitar"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-4">
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Descripcion:</strong> {servicio.descripcion}</p>
          <p><strong>Codigo:</strong> {servicio.codigo}</p>
          <p><strong>Precio:</strong> ${servicio.precio}</p>

          {servicio.dias_disponibles && (
            <p className="text-xs text-gray-400">
              Días disponibles:{" "}
              {servicio.dias_disponibles.map((dia) => dia.nombre).join(", ")}
            </p>
          )}
          {servicio.horarios && (
            <p className="text-xs text-gray-400">
              Horarios: {JSON.parse(servicio.horarios).join(", ")}
            </p>
          )}
        </div>

        <button
          onClick={() => setMostrarCalendario(!mostrarCalendario)}
          className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
        >
          {mostrarCalendario
            ? "Ocultar calendario"
            : "Seleccionar rango de fechas"}
        </button>

        {mostrarCalendario && (
          <div className="mt-4">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setRangoFechas([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={rangoFechas}
              minDate={fechaInicio}
              maxDate={fechaFin}
            />
          </div>
        )}
      </div>

      {showModal && (
        <C.Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title="Éxito!"
          aceptar={handleCloseModal}
        >
          <h1 className="text-lg text-green-600">
            Su turno quedó pendiente a confirmación
          </h1>
          <p className="text-sm">
            <span className="font-medium">{user.name}:</span> en cuanto aprueben tu solicitud recibirás un correo.
          </p>
          <p className="text-sm">Información de contacto: {user.email}</p>
          <div
            className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-800 rounded-lg bg-yellow-50"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>
              <span className="font-medium">Seguí tus solicitudes:</span> podés ver el estado en el área 'Solicitudes'.
            </div>
          </div>
        </C.Modal>
      )}
    </C.Modal>
  );
};

export default ModalSolicitud;
