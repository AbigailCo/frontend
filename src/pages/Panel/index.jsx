import React, { useEffect, useState } from "react";
import * as C from "../../Components";
import * as P from "../../pages";
import { getUser } from "../../util/axios";

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      console.log('token', token);
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
    <C.Contenedor titulo="Panel de usuario" linkBack="-1">
      <h1>Bienvenido {user ? user.name : "..."}</h1>
      {user && (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
       
        </div>
      )}
      <P.Logout />
    </C.Contenedor>
  );
}
