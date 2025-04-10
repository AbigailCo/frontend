import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../Context/UserContext";
import { clearStorage, getStorage } from "../util/axios";
import { initApp } from "../util/initApp";

const UserLayout = () => {
  const { actions: ua } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    initApp(ua);
    const storedData = getStorage();

    if (!storedData || !storedData.token) {
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

  const perfil = ua.persona();
const logo = '/src/assets/2.png';
  return (
    <>
      <nav className='navbar d-flex justify-content-around flex-wrap gap-1 p-2 bg-light shadow'>
        <img
          alt='Logo'
          height='50px'
          src={logo}
          className='rounded-circle'
          style={{ width: "100px", height: "100px" }}
        />
        {perfil && (
          <div className='d-flex align-items-center gap-3'>
            <div className='text-end'>
              <strong className='text-primary'>{perfil.nombre}</strong>
              <br />
              <small>{perfil.correoElectronico}</small>
            </div>
            <button
              className='btn btn-outline-primary btn-sm'
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        )}
      </nav>

      <main className='p-3'>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
