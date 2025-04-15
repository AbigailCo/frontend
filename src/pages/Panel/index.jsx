import React, { useEffect, useState } from "react";
import * as C from "../../Components";
import * as P from "../../pages";
import { getUser } from "../../util/axios";
import { Link } from "react-router-dom";

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // console.log("token", token);
      if (!token) return;

      try {
        const userData = await getUser();
        //   console.log("userData", userData);
        setUser(userData);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <C.Contenedor titulo="Panel de usuario" /*linkBack="-1"*/>
      <h1>Bienvenido {user ? user.name : "..."}</h1>
      {user && (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      <a
        href="/edit-user"
        className="w-full block text-center bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
      >
        Editar
      </a>
      <a
        href="/inventario"
        className="w-full block text-center bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
      >
        Inventario
      </a>
    </C.Contenedor>
  );
}
