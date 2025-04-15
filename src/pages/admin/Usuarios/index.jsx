import React, { useEffect, useState } from "react";
import * as C from "../../../Components";
import * as P from "../..";
import TablaUsuarios from "./TablaUsers";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { getUsers } from "../../../util/admin";

export default function Index() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getUsers();
        setUsers(usersData.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  return (
    <C.Contenedor titulo="Usuarios" linkBack="-1">
      {loading && (
        <div className="flex justify-center">
          <C.Cargando />
        </div>
      )}
      {users && (
        <div className="flex justify-center">
          <TablaUsuarios users={users} />
        </div>
      )}
      {!loading && !users && (
        <div className="flex justify-center">
          <h1>No hay usuarios registrados</h1>
        </div>
      )}
    </C.Contenedor>
  );
}
