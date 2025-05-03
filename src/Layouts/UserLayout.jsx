import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

import { initApp } from "../util/initApp";
import { clearStorage, getStorage } from "../util/localStore";
import * as C from "../Components";

const UserLayout = () => {
  const { actions: ua } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    initApp(ua);
    const storedData = getStorage();
    if (!storedData || !storedData.user) {
      nav("/login");
    } else {
      ua.setStore(storedData);
    }
  }, []);

  const handleLogout = () => {
    clearStorage();
    ua.setStore(null);
    nav("/login");
  };
  const handleEdit = () => {
    nav("/edit-user");
  };

  const perfil = ua.user();
  const logo = "/src/assets/2.png";
  return (
    <>
    <nav className="flex flex-wrap items-center justify-between gap-4 bg-white shadow-md rounded-b-xl p-1">
      <div className="flex items-center gap-4">
        <img
          alt="Logo"
          src={logo}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
  
      {perfil && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-violet-600">{perfil.name}</p>
            <p className="text-sm text-gray-600">{perfil.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-2 py-1 text-sm text-white bg-violet-600 rounded hover:bg-violet-700 transition"
            >
              Salir
            </button>
            <button
              onClick={handleEdit}
              className="px-2 py-1 text-sm text-white bg-violet-600 rounded hover:bg-violet-700 transition"
            >
              Editar perfil
            </button>
          </div>
        </div>
      )}
    </nav>
  
    <main className="p-3">
      <Outlet />
    </main>
  </>
  );
};

export default UserLayout;
