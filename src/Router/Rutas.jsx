import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as P from "../pages";
import * as C from "../Components"
import UserLayout from "../Layouts/UserLayout";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<P.Login />} />
        <Route element={<UserLayout />}>
          <Route path="/panel" element={<P.Panel />} />
          
          {/* <Route path="/login" element={<P.Login />} /> */}
          <Route path="/registro" element={<P.Registro />} />
          <Route path="/reset-password" element={<P.ResetPassword />} />
          <Route path="/forgot-password" element={<P.ForgotPassword />} />
          <Route path="/logout" element={<P.Logout />} />
          <Route path="/menu" element={<C.Menu />} />
          {/* <Route path="/panel-usuario" element={<P.Panel />} /> */}
          <Route path="/edit-user" element={<P.Editar />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}

export default Rutas;
