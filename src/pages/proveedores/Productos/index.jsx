import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
// import * as P from "../..";
import TablaProductos from "./TablaProductos";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { myProductos } from "../../../util/proveedores";
import { filtroProdu } from "../../../util/productos";

export default function Index() {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(false);
    const [filtradas, setFiltradas] = useState(null); 

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const productosData = await myProductos();
        console.log("re.....er", productosData.data);
        setProductos(productosData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);
  const camposDisponibles = [
    { label: "Nombre producto", value: "nombre" },
    { label: "Codigo producto", value: "codigo" },
    { label: "Stock minimo", value: "stock_minimo" },
    { label: "Estado del producto", value: "estado_general" },
    { label: "Fecha de vencimiento", value: "fecha_vencimiento" },
    { label: "Producto ID", value: "producto_id" },
  ];
    
  const handleBuscar = async (payload) => {
    const respuesta = await filtroProdu(payload);
    setFiltradas(respuesta);
  };

  const mostrarProductos = Array.isArray(filtradas) ? filtradas : productos ?? [];
  const handleResetFiltro = () => {
    setFiltradas(null);
  };
  
  return (
    <C.Contenedor  menu={ <C.MenuProducto/>} linkBack>
       <C.Filtros campos={camposDisponibles}  onBuscar={handleBuscar}/>
      
      {filtradas !== null && (
        <div className="my-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-blue-800">
              Resultados de busqueda
            </h2>
            <button
              onClick={handleResetFiltro}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Ver todos los productos
            </button>
          </div>

        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-6">
          <C.Cargando />
        </div>
      ) : mostrarProductos.length > 0 ? (
        <div className="flex justify-center">
          <TablaProductos productos={mostrarProductos} />
        </div>
      ) : (
        <div className="flex justify-center my-4">
          <h1 className="text-gray-600">No hay productos para mostrar.</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
