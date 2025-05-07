import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { getTurnos } from "../../../util/turnos";
import { filtroServi } from "../../../util/servicios";
import ModalSolicitud from "./ModalSolicitud";
import { getDiasSemana } from "../../../util/generales";

const CatalogoTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [filtradas, setFiltradas] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [diasDispo, setDiasDispo] = useState([]);

  const mostrarTurnos = Array.isArray(filtradas) ? filtradas : turnos ?? [];

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const { data } = await getTurnos();
        setTurnos(data);
      } catch (error) {
        console.error("Error al cargar turnos:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDiasDispo = async () => {
      try {
        const res = await getDiasSemana(); 
        setDiasDispo(res); 
      } catch (err) {
        console.error("Error al obtener los dias de la semana:", err);
      }
    }
    fetchTurnos();
    fetchDiasDispo();
  }, []);

  const handleBuscar = async (payload) => {
    const respuesta = await filtroServi(payload);
    setFiltradas(respuesta);
  };

  const handleResetFiltro = () => {
    setFiltradas(null);
  };

  const handleOpenModal = (servicio, dias_disponibles) => {
    setTurnoSeleccionado({ servicio, dias_disponibles });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTurnoSeleccionado(null);
    navigate("/catalogo-turnos");
  };

  if (loading) return <C.Cargando />;

  if (turnos.length === 0) {
    return (
      <C.Contenedor titulo="Catálogo de Turnos" linkBack>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold">No hay turnos disponibles</h2>
          <p className="text-sm text-gray-500">Intenta más tarde.</p>
        </div>
      </C.Contenedor>
    );
  }

  return (
    <C.Contenedor titulo="Catálogo de Turnos" linkBack>
      <C.Filtros
        campos={[
          { label: "Nombre del turno", value: "nombre" },
          { label: "Código servicio", value: "codigo" },
          { label: "Dias disponibles", value: "dias_disponibles", tipo: "select", opciones: diasDispo.map((dia) => ({
            label: dia.nombre,
            value: dia.nombre,
          })), }, 
          { label: "Nombre del proveedor", value: "proveedor_nombre" },
        ]}
        onBuscar={handleBuscar}
      />

      {filtradas !== null && (
        <div className="flex justify-between items-center my-4">
          <h2 className="text-sm font-semibold text-blue-800">
            Resultados de búsqueda
          </h2>
          <button
            onClick={handleResetFiltro}
            className="text-sm text-gray-700 border p-1 rounded hover:bg-gray-100"
          >
            Ver todos
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
        {mostrarTurnos.map(({ servicio, categoria, dias_disponibles }) => (
          <div
            key={servicio.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
          >
            <h2 className="text-md font-semibold text-gray-800">
              {servicio?.nombre}
            </h2>
            <p className="text-sm text-gray-600">
              Categoría: {categoria?.nombre ?? "Sin categoría"}
            </p>
            <p className="text-sm text-gray-500">{servicio.descripcion}</p>
            <p className="text-violet-700 font-bold text-lg">
              ${servicio.precio ?? "N/A"}
            </p>

            {dias_disponibles && (
              <p className="text-xs text-gray-400">
                Días disponibles:{" "}
                {dias_disponibles.map((dia) => dia.nombre).join(", ")}
              </p>
            )}
            {servicio.horarios && (
              <p className="text-xs text-gray-400">
                Horarios: {servicio.horarios.join(", ")}
              </p>
            )}
            <Link
              onClick={() => handleOpenModal(servicio, dias_disponibles)}
              className="inline-block text-sm text-violet-600 hover:underline mt-2"
            >
              Ver más detalles
            </Link>
          </div>
        ))}
      </div>

      {showModal && turnoSeleccionado && (
        <ModalSolicitud
          datos={turnoSeleccionado}
         // dias_disponibles={turnoSeleccionado.dias_disponibles}
          onClose={handleCloseModal}
          isOpen={showModal}
        />
      )}
    </C.Contenedor>
  );
};

export default CatalogoTurnos;
