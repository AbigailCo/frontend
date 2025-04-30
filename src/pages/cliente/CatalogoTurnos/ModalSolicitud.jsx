import React, { useEffect, useState } from "react";
import {
    createSolicitud,
    fetchHorariosReservados,
} from "../../../util/solicitudes";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as C from "../../../Components";

const ModalSolicitud = ({ servicio, isOpen, onClose }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [horariosReservadosState, setHorariosReservadosState] = useState([]);
    const [loading, setLoading] = useState(false); 
    const diasDisponibles = servicio.dias_disponibles?.map((d) => d.id) ?? [];
    const horarios = servicio?.horarios ? JSON.parse(servicio.horarios) : [];

    const horariosDisponibles = horarios.filter(
        (hora) => !horariosReservadosState.includes(hora)
    );

    const disableDays = ({ date }) => {
        const day = date.getDay();
        return !diasDisponibles.includes(day);
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                if (fechaSeleccionada) {
                    const dataReservados = await fetchHorariosReservados(
                        servicio.id,
                        fechaSeleccionada
                    );
                    setHorariosReservadosState(dataReservados);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [fechaSeleccionada, servicio.id]);

    const handleSolicitar = async () => {
        if (!fechaSeleccionada || !horarioSeleccionado) {
            toast.error("Selecciona un dia y un horario primero.");
            return;
        }

        try {
            await createSolicitud({
                proveedor_id: servicio.proveedor_id,
                servicio_id: servicio.id,
                fecha_reserva: `${fechaSeleccionada.toISOString().split("T")[0]}`,
                hora_reserva: horarioSeleccionado,
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
                    <p>
                        <strong>Descripcion:</strong> {servicio.descripcion}
                    </p>
                    <p>
                        <strong>Codigo:</strong> {servicio.codigo}
                    </p>
                    <p>
                        <strong>Precio:</strong> ${servicio.precio}
                    </p>
                    {servicio.fecha_vencimiento && (
                        <p>
                            <strong>Vence:</strong> {servicio.fecha_vencimiento}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => setMostrarCalendario(!mostrarCalendario)}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
                >
                    {mostrarCalendario
                        ? "Ocultar calendario"
                        : "Seleccionar fecha y horario"}
                </button>

                {mostrarCalendario && (
                    <>
                        <Calendar
                            onChange={setFechaSeleccionada}
                            value={fechaSeleccionada}
                            tileDisabled={disableDays}
                            className="my-4"
                        />
                        {fechaSeleccionada && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {loading ? (
                                    <C.Cargando size={25} />
                                ) : horariosDisponibles.length > 0 ? (
                                    horariosDisponibles.map((hora) => (
                                        <button
                                            key={hora}
                                            onClick={() => setHorarioSeleccionado(hora)}
                                            className={`px-3 py-1 border rounded ${horarioSeleccionado === hora
                                                    ? "bg-violet-600 text-white"
                                                    : "bg-white text-gray-700"
                                                }`}
                                        >
                                            {hora}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        No hay horarios disponibles en esta fecha.
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            {showModal && (
                <C.Modal isOpen={showModal} onClose={handleCloseModal} title="Exito!" aceptar={handleCloseModal} >
                    <h1 className="text-lg text-green-600">Su turno quedo pendiente a confirmacion</h1>
                    <p className="text-sm"><span className="font-medium">{user.name} :</span> en cuanto aprueben tu solicitud recibiras un
                        correo con la aprobacion
                    </p>
                    <p className="text-sm">Informacion de contacto: {user.email}</p>
                    <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-200 dark:text-yellow-800 dark:border-yellow-800" role="alert">
                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Segui tus solicitudes</span> Podes mirar el estado de tus solicitudes en el area 'Solicitudes'.
                        </div>
                    </div>
                </C.Modal>
            )}
        </C.Modal>
    );
};

export default ModalSolicitud;
