import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
import TablaSolicitudes from "./TablaSolicitudes";
import FiltroSolicitudes from "./FiltroSolicitudes";
// import * as P from "../..";

import { Link } from "react-router-dom";
import { X } from "lucide-react";

import { mySolicitudesCliente } from "../../../util/cliente";

export default function Index() {
  const [solicitudes, setSolicitudes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtradas, setFiltradas] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      setLoading(true);
      try {
        const solicitudesData = await mySolicitudesCliente();
        setSolicitudes(solicitudesData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener lo servicios:", err);
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);
  const mostrarSolicitudes = Array.isArray(filtradas)
    ? filtradas
    : solicitudes ?? [];
  const handleResetFiltro = () => {
    setFiltradas(null);
  };

  return (
    <C.Contenedor titulo="Solicitudes" linkBack="-1">
      <C.MenuCliente />
      <FiltroSolicitudes onResultados={setFiltradas} />
      {filtradas !== null && (
        <div className="my-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-800">
              Resultados de busqueda
            </h2>
            <button
              onClick={handleResetFiltro}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Ver todas las solicitudes
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-6">
          <C.Cargando />
        </div>
      ) : mostrarSolicitudes.length > 0 ? (
        <div className="flex justify-center">
          <TablaSolicitudes solicitudes={mostrarSolicitudes} />
        </div>
      ) : (
        <div className="flex justify-center my-4">
          <h1 className="text-gray-600">No hay solicitudes para mostrar.</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
