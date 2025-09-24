import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { getServiciosHabi, filtroServi } from "../../../util/servicios";

import ModalSolicitud from "./ModalSolicitud";
import { getCategorias } from "../../../util/generales";
const CatalogoServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [filtradas, setFiltradas] = useState(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
   const [categorias, setCategorias] = useState([]);
    const [meta, setMeta] = useState(null);
     const [page, setPage] = useState(1);


   useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias(); 
        setCategorias(res); 
      } catch (err) {
        console.error("Error al obtener las categorias:", err);
      }
    }
   
    fetchCategorias();

  }, []);

  const mostrarServicios = Array.isArray(filtradas)
    ? filtradas
    : servicios ?? [];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServiciosHabi(page);
        setServicios(data.data);
        setMeta(data.meta);

      } catch (error) {
        console.error("Error al cargar servicios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicios();
  }, [page]);

  const handleBuscar = async (payload) => {
    const respuesta = await filtroServi(payload);
    setFiltradas(respuesta.data);
    setMeta(respuesta.meta);
  };

  const handleResetFiltro = () => {
    setFiltradas(null);
  };

  const handleOpenModal = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setServicioSeleccionado(null);
    navigate("/catalogo-servicios");
  };

  if (loading) return <C.Cargando />;

  if (servicios.length === 0) {
    return (
      <C.Contenedor titulo="Catálogo de Servicios" linkBack>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold">
            No hay servicios disponibles
          </h2>
          <p className="text-sm text-gray-500">Intenta más tarde.</p>
        </div>
      </C.Contenedor>
    );
  }

  return (
    <C.Contenedor titulo="Catálogo de Servicios" linkBack>
      <C.Filtros
        campos={[
          { label: "Nombre del servicio", value: "nombre" },
          { label: "Código servicio", value: "codigo" },
        
          { label: "Tipo de servicio", value: "categoria_id", tipo: "select", opciones: categorias.map((cat) => ({
            label: cat.nombre,
            value: cat.id,
          })), }, 
          { label: "Estado del turno", value: "estado_general", tipo: "select", opciones: [
            { label: "Activo", value: "act" },
            { label: "Inactivo", value: "ina" },
          
          ]},
          { label: "Fecha de vencimiento", value: "fecha_vencimiento", tipo: "fecha" },
          
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
        {mostrarServicios.map(({ servicio, categoria }) => (
          <div
            key={servicio.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
          >
            <h2 className="text-md font-semibold text-gray-800">
              {servicio.nombre}
            </h2>
            <p className="text-sm text-gray-600">
              Categoría: {categoria?.nombre ?? "Sin categoría"}
            </p>
            <p className="text-sm text-gray-500">{servicio.descripcion}</p>
            <p className="text-violet-700 font-bold text-lg">
              ${servicio.precio ?? "N/A"}
            </p>
           
            {servicio.stock && (
              <p className="text-xs text-gray-400">
               Stock: {servicio.stock ?? "0"}
              </p>
            )}

            {servicio.fecha_vencimiento && (
              <p className="text-xs text-gray-400">
                Vence: {servicio.fecha_vencimiento}
              </p>
            )}
            <Link
              onClick={() => handleOpenModal(servicio)}
              className="inline-block text-sm text-violet-600 hover:underline mt-2"
            >
              Ver más detalles
            </Link>
          </div>
        ))}
         {meta && (
            <div className="flex justify-center my-4 gap-2">
              <button
                disabled={meta.current_page === 1}
                onClick={() => setPage(meta.current_page - 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Anterior
              </button>
              <span className="px-3 py-1">{`Página ${meta.current_page} de ${meta.last_page}`}</span>
              <button
                disabled={meta.current_page === meta.last_page}
                onClick={() => setPage(meta.current_page + 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Siguiente
              </button>
            </div>
          )}
      </div>

      {showModal && servicioSeleccionado && (
        <ModalSolicitud
          servicio={servicioSeleccionado}
          onClose={handleCloseModal}
          isOpen={showModal}
        />
      )}
    </C.Contenedor>
  );
};

export default CatalogoServicios;
