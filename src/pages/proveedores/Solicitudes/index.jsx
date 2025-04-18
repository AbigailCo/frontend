import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
import TablaSolicitudes from "./TablaSolicitudes"
// import * as P from "../..";


import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {mySolicitudes } from "../../../util/proveedores";


export default function Index() {
  const [solicitudes, setSolicitudes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      setLoading(true);
      try {
        const solicitudesData = await mySolicitudes();
        setSolicitudes(solicitudesData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener lo servicios:", err);
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);
  
  return (
    <C.Contenedor titulo="Solicitudes" linkBack="-1">
      <C.MenuProveedor/>
      {loading && (
        <div className="flex justify-center">
          <C.Cargando />
        </div>
      )}
      {solicitudes && (
        <div className="flex justify-center">
          <TablaSolicitudes solicitudes={solicitudes} />
        </div>
      )}
      {!loading && !solicitudes && (
        <div className="flex justify-center">
          <h1>No hay usuarios registrados</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
