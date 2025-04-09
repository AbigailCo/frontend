// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as P from "../pages";
import * as C from "../Components"

function Rutas() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<P.Home />} />
      
        <Route path="/login" element={<P.Login />} />
        <Route path="/registro" element={<P.Registro />} />
        <Route path="/reset-password" element={<P.ResetPassword />} />
        <Route path="/forgot-password" element={<P.ForgotPassword />} />
        <Route path="/logout" element={<P.Logout />} />
        <Route path="/menu" element={<C.Menu />} />
        <Route path="/panel-usuario" element={<P.Panel />} />
        <Route path="/edit-user" element={<P.Editar />} />
      </Routes>
    </Router>
  );
}

export default Rutas;
