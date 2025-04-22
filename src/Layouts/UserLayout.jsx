import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

import { initApp } from "../util/initApp";
import { clearStorage, getStorage } from "../util/localStore";

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
      <nav className="flex flex-wrap items-center justify-between gap-4 bg-white shadow-md rounded-b-xl p-2">
        <div className="flex items-center gap-4">
          <img
            alt="Logo"
            src={logo}
            className="w-24 h-24 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold text-gray-800">Nombre de tu app</h1>
        </div>

        {perfil && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-violet-600">
                {perfil.name}
              </p>
              <p className="text-sm text-gray-600">{perfil.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-2 py-2 text-sm font-sm text-white bg-violet-600 rounded hover:bg-violet-700 transition"
              >
                Salir
              </button>
              <button
                onClick={handleEdit}
                className="px-2 py-2 text-sm font-sm text-white bg-violet-600 rounded hover:bg-violet-700 transition"
              >
                Editar
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
