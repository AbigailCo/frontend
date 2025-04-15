import React from "react";
import * as C from "../../Components";
import * as P from "../../pages";

import { Link } from "react-router-dom";

export default function Index() {
  
  return (
    <C.Contenedor titulo="Inventario" /*linkBack="-1"*/>
      <h1>Aca va estar el panel para generar productos </h1>
    <P.Categorias />  
    </C.Contenedor>
  );
}
