import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
// import * as P from "../..";
import TablaProductos from "./TablaProductos";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { myProductos } from "../../../util/proveedores";

export default function Index() {
  const [productos, setProductos] = useState(null);
  const [loading, setLoading] = useState(false);

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
  
  return (
    <C.Contenedor titulo="Productos" linkBack="-1">
        <C.MenuProducto/>
      {loading && (
        <div className="flex justify-center">
          <C.Cargando />
        </div>
      )}
      {productos && (
        <div className="flex justify-center">
          <TablaProductos productos = {productos} />
        </div>
      )}
      {!loading && !productos && (
        <div className="flex justify-center">
          <h1>No hay usuarios registrados</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
