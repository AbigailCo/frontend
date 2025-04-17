import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { getServiciosHabi } from "../../../util/cliente";

const CatalogoServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/catalogo-servicios"); // Redirección al cerrar modal
  };

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const serviciosData = await getServiciosHabi();
        setServicios(serviciosData.data);
      } catch (err) {
        console.error("Error al obtener servicios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  if (loading) {
    return <C.Cargando/>;
  }

  if (servicios.length === 0) {
    return <p className="text-center mt-10">No hay servicios disponibles.</p>;
  }

  return (
    <C.Contenedor titulo="Catalogo de Servicios" linkBack="-1">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {servicios.map((serv) => (
          <div
            key={serv.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{serv.nombre}</h2>
              <p className="text-sm text-gray-500">{serv.descripcion}</p>
            </div>

            <p className="text-violet-700 font-bold text-lg">${serv.precio || "N/A"}</p>
            <p className="text-sm text-gray-600">Stock: {serv.stock ?? "0"}</p>
            {serv.fecha_vencimiento && (
              <p className="text-xs text-gray-400">Vence: {serv.fecha_vencimiento}</p>
            )}

            <Link
             onClick={() => {
              setServicioSeleccionado(serv);
              setShowModal(true);
            }}
              className="mt-4 inline-block text-sm text-violet-600 hover:underline"
            >
              Ver mas detalles
            </Link>
          </div>
        ))}
      </div>
      {showModal && servicioSeleccionado && (
              <C.Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                title={servicioSeleccionado.nombre}
              >
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Descripcion:</strong> {servicioSeleccionado.descripcion}
                  </p>
                  <p>
                    <strong>Codigo:</strong> {servicioSeleccionado.codigo}
                  </p>
                  <p>
                    <strong>Precio:</strong> ${servicioSeleccionado.precio}
                  </p>
                  <p>
                    <strong>Stock:</strong> {servicioSeleccionado.stock}
                  </p>
                  <p>
                    <strong>Stock minimo:</strong> {servicioSeleccionado.stock_minimo}
                  </p>
                  {servicioSeleccionado.fecha_vencimiento && (
                    <p>
                      <strong>Vence:</strong> {servicioSeleccionado.fecha_vencimiento}
                    </p>
                  )}
                  {servicioSeleccionado.categoria?.nombre && (
                    <p>
                      <strong>Categoria:</strong>{" "}
                      {servicioSeleccionado.categoria.nombre}
                    </p>
                  )}
                </div>
              </C.Modal>
            )}
  

    </C.Contenedor>
   
  );
};

export default CatalogoServicios;
