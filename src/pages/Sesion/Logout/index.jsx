import { logout } from "../../../util/axios"; // ajustá la ruta según tu estructura
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error cerrando sesión", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline"
    >
      Cerrar sesión
    </button>
  );
};

export default Logout;
