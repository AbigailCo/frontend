import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as P from "../pages";
import * as C from "../Components";
import UserLayout from "../Layouts/UserLayout";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<P.Login />} />
        <Route path="/forgot-password" element={<P.ForgotPassword />} />
        <Route path="/registro" element={<P.Registro />} />
        <Route path="/home" element={<P.Home />} />
        <Route element={<UserLayout />}>
          <Route path="/logout" element={<P.Logout />} />
          <Route path="/panel" element={<P.Panel />} />
          <Route path="/menu" element={<C.Menu />} />
          <Route path="/inventario" element={<P.Inventario />} />

          <Route path="/usuarios" element={<P.Usuarios />} />
          <Route path="/usuario-edit/:id" element={<P.UsuarioEdit />} />
          <Route path="/register-usuario" element={<P.RegisterUsuario />} />
          <Route path="/reset-password" element={<P.ResetPassword />} />
          <Route path="/edit-user" element={<P.Editar />} />

          <Route path="/tus-productos" element={<P.Productos />} />
          <Route path="/create-producto" element={<P.CreateEditProducto />} />
          <Route path="/producto-edit/:id" element={<P.CreateEditProducto />} />

          <Route path="/tus-servicios" element={<P.Servicios />} />
          <Route path="/create-servicio" element={<P.CreateEditServicio />} />
          <Route path="/servicio-edit/:id" element={<P.CreateEditServicio />} />

          <Route path="/tus-solicitudes" element={<P.Solicitudes />} />

          <Route path="/catalogo-productos" element={<P.CatalogoProductos />} />
          <Route path="/catalogo-turnos" element={<P.CatalogoTurnos />} />
          <Route path="/catalogo-servicios" element={<P.CatalogoServicios />} />
          <Route
            path="/tus-solicitudes-cliente"
            element={<P.SolicitudesCliente />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;
