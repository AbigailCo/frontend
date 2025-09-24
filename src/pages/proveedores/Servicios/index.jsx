import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
import TablaServicios from "./TablaServicios";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { getCategorias } from "../../../util/generales";
import { myServicios, filtroServi } from "../../../util/servicios";

export default function Index() {
  const [servicios, setServicios] = useState(null);
  const [filtradas, setFiltradas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        // console.log("categorias", res);
        setCategorias(res);
      } catch (err) {
        console.error("Error al obtener las categor�as:", err);
      }
    };
    fetchCategorias();
  }, []);

  const camposDisponibles = [
    { label: "Nombre servicio", value: "nombre", tipo: "texto" },
    { label: "Codigo", value: "codigo", tipo: "texto" },
    { label: "Stock minimo", value: "stock_minimo", tipo: "texto" },
    {
      label: "Estado de la servicio",
      value: "estado_general",
      tipo: "select",
      opciones: [
        { label: "Activo", value: "act" },
        { label: "Inactivo", value: "ina" },
      ],
    },
    {
      label: "Fecha de vencimiento",
      value: "fecha_vencimiento",
      tipo: "fecha",
    },
    {
      label: "Categoria",
      value: "categoria_id",
      tipo: "select",
      opciones: categorias.map((cat) => ({
        label: cat.nombre,
        value: cat.id,
      })),
    },
  ];
  const handleBuscar = async (payload) => {
    const respuesta = await filtroServi(payload);
    console.log("respuesta", respuesta);
    setFiltradas(respuesta.data);
    setMeta(respuesta.meta);
  };
  const fetchServicios = async () => {
    setLoading(true);
    try {
      const serviciosData = await myServicios(page);
      console.log("servicios", serviciosData);
      setServicios(serviciosData.data);
      setMeta(serviciosData.meta);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener lo servicios:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServicios();
  }, [page]);

  const mostrarServicio = Array.isArray(filtradas)
    ? filtradas
    : servicios ?? [];
  const handleResetFiltro = () => {
    setFiltradas(null);
  };

  return (
    <C.Contenedor linkBack menu={<C.MenuServicios />}>
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
          <TablaServicios servicios={mostrarServicio} meta ={meta} setPage={setPage} recargar={fetchServicios}/>
          
        </div>
      ) : (
        <div className="flex justify-center my-4">
          <h1 className="text-gray-600">No hay servicios para mostrar.</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
