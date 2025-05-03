import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
// import * as P from "../..";
import TablaServicios from "./TablaServicios";
import { filtroServi } from "../../../util/servicios";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { myServicios } from "../../../util/proveedores";


export default function Index() {
  const [servicios, setServicios] = useState(null);
   const [filtradas, setFiltradas] = useState(null); 
  const [loading, setLoading] = useState(false);
  const camposDisponibles = [
    { label: "Nombre del servicio", value: "nombre" },
    { label: "Codigo servicio", value: "codigo" },
    { label: "Stock minimo", value: "stock_minimo" },
    { label: "Estado del servicio", value: "estado_general" },
    { label: "Fecha de vencimiento", value: "fecha_vencimiento" },
    { label: "servicio ID", value: "servicio_id" },
  ];
  
    const handleBuscar = async (payload) => {
      const respuesta = await filtroServi(payload);
      setFiltradas(respuesta);
    };
  

  useEffect(() => {
    const fetchServicios = async () => {
      setLoading(true);
      try {
        const serviciosData = await myServicios();
        setServicios(serviciosData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener lo servicios:", err);
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);


  const mostrarServicio = Array.isArray(filtradas) ? filtradas : servicios ?? [];
  const handleResetFiltro = () => {
    setFiltradas(null);
  };
  
  return (
    <C.Contenedor linkBack menu =  {<C.MenuServicios/>}>
     <C.Filtros campos={camposDisponibles} onBuscar={handleBuscar} />
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
              Ver todos los servicios
            </button>
          </div>

        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-6">
          <C.Cargando />
        </div>
      ) : mostrarServicio.length > 0 ? (
        <div className="flex justify-center">
          <TablaServicios servicios={mostrarServicio} />
        </div>
      ) : (
        <div className="flex justify-center my-4">
          <h1 className="text-gray-600">No hay servicios para mostrar.</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
