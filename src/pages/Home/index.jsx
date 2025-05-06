import React from "react";
import * as C from "../../Components";
import Layouts from "../../Layouts/UserLayout";


export default function index() {

  return (
    <>
      <Layouts>
        <C.Contenedor titulo="Home" linkBack="-1">
          <h1>Bienvenido a la aplicacion</h1>
          <p>Esta es la pagina de inicio</p>
        </C.Contenedor>
      </Layouts>
    </>
  );
}
