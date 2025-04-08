import React from "react";
import * as C from "../../Components";
import * as P from "../../pages";


export default function index() {
  return (
    <C.Contenedor titulo="Panel de usuario">
 
        <h1>Bienvenido</h1>
        <P.Logout/>
    </C.Contenedor>
  );
}
