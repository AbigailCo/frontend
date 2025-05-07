import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { filtroServi } from "../../../util/servicios";
import ModalSolicitud from "./ModalSolicitud";
import { getReservas } from "../../../util/reservas";

const CatalogoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filtradas, setFiltradas] = useState(null);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const mostrarReservas = Array.isArray(filtradas) ? filtradas : reservas ?? [];

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const { data } = await getReservas();
        setReservas(data);
      } catch (error) {
        console.error("Error al cargar turnos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  const handleBuscar = async (payload) => {
    const respuesta = await filtroServi(payload);
    setFiltradas(respuesta);
  };

  const handleResetFiltro = () => {
    setFiltradas(null);
  };

  const handleOpenModal = (reserva) => {
    setReservaSeleccionada(reserva);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReservaSeleccionada(null);
    navigate("/catalogo-reservas");
  };

  if (loading) return <C.Cargando />;

  if (reservas.length === 0) {
    return (
      <C.Contenedor titulo="Catálogo de Reservas" linkBack>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold">No hay reservas disponibles</h2>
          <p className="text-sm text-gray-500">Intenta más tarde.</p>
        </div>
      </C.Contenedor>
    );
  }

  return (
    <C.Contenedor titulo="Catálogo de Reservas" linkBack>
      <C.Filtros
        campos={[
          { label: "Nombre de la reserva", value: "nombre" },
          { label: "Código de la reserva", value: "codigo" },
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
        {mostrarReservas.map(({ servicio, categoria }) => (
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
           
            <Link
              onClick={() => handleOpenModal(servicio)}
              className="inline-block text-sm text-violet-600 hover:underline mt-2"
            >
              Ver más detalles
            </Link>
          </div>
        ))}
      </div>

      {showModal && reservaSeleccionada && (
        <ModalSolicitud
          servicio={reservaSeleccionada}
          onClose={handleCloseModal}
          isOpen={showModal}
        />
      )}
    </C.Contenedor>
  );
};

export default CatalogoReservas;
