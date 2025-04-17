import React, { useEffect, useState } from "react";
import * as C from "../../Components";
import * as P from "../../pages";

import { Link } from "react-router-dom";
import { getUser } from "../../util/user";

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // console.log("token", token);
      if (!token) return;

      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };

    fetchUser();
  }, []);
  return (
    <C.Contenedor titulo="Bienvenidos" /*linkBack="-1"*/>
      {user ? (
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center text-violet-700">{user.roles && user.roles.length > 0
              ? user.roles.join(", ")
              : "Sin rol"}</h1>
        </div>
      ) : <C.Cargando />}
      {user?.roles?.includes("admin") && <C.MenuAdmin />}
      {user?.roles?.includes("proveedor") && <C.MenuProveedor />}
      {user?.roles?.includes("cliente") && <C.MenuCliente />}


    </C.Contenedor>
  );
}
