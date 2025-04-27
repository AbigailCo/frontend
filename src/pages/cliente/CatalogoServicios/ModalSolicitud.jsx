import React, { useEffect, useState } from "react";
import { createSolicitud, fetchHorariosReservados } from "../../../util/solicitudes";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as C from "../../../Components";

const ModalSolicitud = ({ servicio, isOpen, onClose }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [horariosReservadosState, setHorariosReservadosState] = useState([]);
    const [loading, setLoading] = useState(false); // Cambié serLoading a setLoading
    const diasDisponibles = servicio.dias_disponibles?.map(d => d.id) ?? [];
    const horarios = servicio?.horarios ? JSON.parse(servicio.horarios) : [];

    const horariosDisponibles = horarios.filter(
        hora => !horariosReservadosState.includes(hora)
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
                    const dataReservados = await fetchHorariosReservados(servicio.id, fechaSeleccionada);
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
            toast.error("Seleccioná un día y un horario primero.");
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
            onClose();
        } catch (error) {
            toast.error("Error al enviar solicitud");
            console.error(error);
        }
    };

    return (
        <C.Modal title={servicio.nombre} aceptar={handleSolicitar} titleButton="Solicitar" isOpen={isOpen} onClose={onClose}>
            <div className="p-4">
                <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Descripcion:</strong> {servicio.descripcion}</p>
                    <p><strong>Codigo:</strong> {servicio.codigo}</p>
                    <p><strong>Precio:</strong> ${servicio.precio}</p>
                    {servicio.fecha_vencimiento && (
                        <p><strong>Vence:</strong> {servicio.fecha_vencimiento}</p>
                    )}
                </div>

                <button
                    onClick={() => setMostrarCalendario(!mostrarCalendario)}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
                >
                    {mostrarCalendario ? "Ocultar calendario" : "Seleccionar fecha y horario"}
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
                                    <C.Cargando size={25}/> 
                                ) : horariosDisponibles.length > 0 ? (
                                    horariosDisponibles.map(hora => (
                                        <button
                                            key={hora}
                                            onClick={() => setHorarioSeleccionado(hora)}
                                            className={`px-3 py-1 border rounded ${horarioSeleccionado === hora ? "bg-violet-600 text-white" : "bg-white text-gray-700"
                                                }`}
                                        >
                                            {hora}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No hay horarios disponibles en esta fecha.</p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </C.Modal>
    );
};

export default ModalSolicitud;
