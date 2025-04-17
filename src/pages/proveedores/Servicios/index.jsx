import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
// import * as P from "../..";
import TablaServicios from "./TablaServicios";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { myServicios } from "../../../util/proveedores";


export default function Index() {
  const [servicios, setServicios] = useState(null);
  const [loading, setLoading] = useState(false);

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
  
  return (
    <C.Contenedor titulo="Servicios" linkBack="-1">
      <C.MenuServicios/>
      {loading && (
        <div className="flex justify-center">
          <C.Cargando />
        </div>
      )}
      {servicios && (
        <div className="flex justify-center">
          <TablaServicios servicios={servicios} />
        </div>
      )}
      {!loading && !servicios && (
        <div className="flex justify-center">
          <h1>No hay usuarios registrados</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
