import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../Context/UserContext";
import { clearStorage, getStorage } from "../util/axios";
import { initApp } from "../util/initApp";

const UserLayout = () => {
  const { actions: ua } = useContext(UserContext);
  console.log("UserLayout: ", ua);
  const nav = useNavigate();

  useEffect(() => {
    initApp(ua);
    const storedData = getStorage();
    //console.log("que guarda el localStorage:", storedData);

    if (!storedData || !storedData.user) {
      //console.log('entro ac??')
      nav("/login");
    } else {
      //console.log('o aca??')
      ua.setStore(storedData);
    }
  }, []);

  const handleLogout = () => {
    clearStorage();
    ua.setStore(null);
    nav("/login");
  };

  const perfil = ua.user();
  // console.log("perfil: ", perfil);
  const logo = "/src/assets/2.png";
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white shadow-md rounded-b-xl">
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
              <p className="text-lg font-semibold text-violet-600">
                {perfil.name}
              </p>
              <p className="text-sm text-gray-600">{perfil.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded hover:bg-violet-700 transition"
            >
              Salir
            </button>
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
