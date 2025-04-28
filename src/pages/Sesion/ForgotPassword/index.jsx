import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as C from "../../../Components";
import { forgotpassword } from "../../../util/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus("");
    setLoading(true);

    try {
      const response = await forgotpassword(email);

      if (response.message && response.email) {
        setSuccessMessage(response.message);
        setUserEmail(response.email);
        setShowModal(true);
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        console.error("Error inesperado:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/"); // Redirección al cerrar modal
  };

  return (
    <C.Contenedor linkBack>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
        {status && <p className="text-green-600 mb-4">{status}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email[0]}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-violet-600 text-white w-full py-2 rounded hover:bg-violet-700 transition"
          >
            {loading ? "Enviando..." : "Enviar Enlace"}
          </button>
        </form>

        {showModal && (
          <C.Modal
            isOpen={showModal}
            onClose={handleCloseModal}
            title="¡Éxito!"
          >
            <p>{successMessage}</p>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </C.Modal>
        )}
      </div>
    </C.Contenedor>
  );
};

export default ForgotPassword;
