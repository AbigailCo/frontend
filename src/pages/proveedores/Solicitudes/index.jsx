import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
import TablaSolicitudes from "./TablaSolicitudes";

import { filtroSoliProve, getCategorias, mySolicitudes } from "../../../util/proveedores";



export default function Index() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtradas, setFiltradas] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias(); 
        console.log("categorias", res);
        setCategorias(res); 
      } catch (err) {
        console.error("Error al obtener las categorías:", err);
      }
    }
    fetchCategorias();
  }, []);

  useEffect(() => {
   
    const fetchSolicitudes = async () => {
      setLoading(true);
      try {
        const res = await mySolicitudes();

        setSolicitudes(res.data);
      } catch (err) {
        console.error("Error al obtener las solicitudes:", err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchSolicitudes();
  }, []);

  const mostrarSolicitudes = Array.isArray(filtradas) ? filtradas : solicitudes ?? [];
  // console.log("solicitudes", solicitudes);
  // console.log("filtradas", filtradas);
  const handleResetFiltro = () => {
    setFiltradas(null);
  };

  const camposDisponibles = [
    { label: "Nombre servicio/producto", value: "nombre", tipo: "texto" },
    { label: "Codigo", value: "codigo", tipo: "texto" },
    { label: "Stock minimo", value: "stock_minimo", tipo: "texto" },
    { label: "Cliente", value: "cliente", tipo: "texto" },
    { label: "Estado de la solicitud", value: "estado_general", tipo: "select", opciones: [
      { label: "Pendiente", value: "pend" },
      { label: "Aprobada", value: "apro" },
      { label: "Rechazada", value: "recha" },
    ]},
    { label: "Fecha de vencimiento", value: "fecha_vencimiento", tipo: "fecha" },
    { label: "Categoria", value: "categoria_id", tipo: "select", opciones: categorias.map((cat) => ({
      label: cat.nombre,
      value: cat.id,
    })), }, 
  ];
  const handleBuscar = async (payload) => {
    const respuesta = await filtroSoliProve(payload);
    setFiltradas(respuesta);
  };

  return (
    <C.Contenedor linkBack>
     <C.Filtros campos={camposDisponibles}  onBuscar={handleBuscar}/>
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
