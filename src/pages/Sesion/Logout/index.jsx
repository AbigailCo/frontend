
import { useNavigate } from "react-router-dom";
import { logout } from "../../../util/user";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
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
