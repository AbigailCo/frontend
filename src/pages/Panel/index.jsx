import React, { useEffect, useState } from "react";
import * as C from "../../Components";
import * as P from "../../pages";

import { Link } from "react-router-dom";
import { getUser } from "../../util/user";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const userData = await getUser();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setLoading(false);
      }
    };

    fetchUser();
 
  }, []);
  const useRol = user?.roles && user.roles.length > 0
    ? user.roles.join(", ")
    : "Sin rol";
  return (
    <>
   {loading && <C.Cargando />}
      {user?.roles?.includes("admin") && <C.Contenedor titulo={useRol} menu={<C.MenuAdmin />} />}
      {user?.roles?.includes("proveedor") && <C.Contenedor titulo={useRol} menu={<C.MenuProveedor />} />}
      {user?.roles?.includes("cliente") && <C.Contenedor titulo={useRol} menu={<C.MenuCliente />} size="xl" />}
    </>

  );
}
