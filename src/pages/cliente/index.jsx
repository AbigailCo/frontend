import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
// import * as P from "../..";
// import TablaProductos from "./TablaProductos";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import CatalogoProductos from "./CatalogoProductos";
// import { getProductos } from "../../../util/proveedores";

export default function Index() {
  // const [productos, setProductos] = useState(null);
   const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const productosData = await getProductos();
  //       console.log("re.....er", productosData.data);
  //       setProductos(productosData.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error al obtener los usuarios:", err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  
  return (
    <C.Contenedor titulo="Cliente" linkBack="-1">
        <C.MenuCliente/>
      {loading && (
        <div className="flex justify-center">
          <C.Cargando />
        </div>
      )}
  
        <div className="flex justify-center">
          <CatalogoProductos/>
        </div>
      
      {/* {!loading && !productos && (
        <div className="flex justify-center">
          <h1>No hay usuarios registrados</h1>
        </div>
      )} */}
    </C.Contenedor>
  );
}
