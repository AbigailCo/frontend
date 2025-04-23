import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { getServiciosHabi } from "../../../util/cliente";
import { createSolicitud } from "../../../util/solicitudes";
import { toast } from "react-toastify";
import { filtroServi } from "../../../util/servicios";

const CatalogoServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [filtradas, setFiltradas] = useState(null);
  const mostrarServicios = Array.isArray(filtradas)
    ? filtradas
    : servicios ?? [];
  const handleResetFiltro = () => {
    setFiltradas(null);
  };
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cliente_id: "",
    proveedor_id: "",
    producto_id: "",
    servicio_id: "",
    mensaje_opcional: "",
    fecha_solicitud: "",
    fecha_respuesta: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/catalogo-servicios");
  };

  useEffect(() => {
    if (showModal == false) {
      setForm({
        cliente_id: "",
        proveedor_id: "",
        producto_id: "",
        // servicio_id: "",
        // mensaje_opcional: "",
        // fecha_solicitud: "",
        // fecha_respuesta: "",
      });
    } else {
      setForm({
        cliente_id: "",
        proveedor_id: servicioSeleccionado?.proveedor_id,
        servicio_id: servicioSeleccionado?.id,
        // mensaje_opcional: "",
        // fecha_solicitud: "",
        // fecha_respuesta: "",
      });
    }
  }, [showModal, servicioSeleccionado]);
  console.log("que????", servicioSeleccionado);

  const handleSolicitar = async () => {
    setLoading(true);
    setErrors({});
    try {
      //console.log('que mando', form)
      await createSolicitud(form);
      //console.log(respuestaData)
      toast.success("Solicitud enviada");
      setShowModal(false);
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
  const camposDisponibles = [
    { label: "Nombre del servicio", value: "nombre" },
    { label: "Codigo servicio", value: "codigo" },
    { label: "Stock minimo", value: "stock_minimo" },
    { label: "Estado del servicio", value: "estado_general" },
    { label: "Fecha de vencimiento", value: "fecha_vencimiento" },
    { label: "servicio ID", value: "servicio_id" },
  ];
  const handleBuscar = async (payload) => {
    const respuesta = await filtroServi(payload);
    setFiltradas(respuesta);
  };

  if (loading) {
    return <C.Cargando />;
  }

  if (servicios.length === 0) {
    return (
         <C.Contenedor titulo="Catalogo de Servicios" linkBack="-1">
           <div className="flex flex-col items-center justify-center h-full">
             <h2 className="text-lg font-semibold text-gray-800">No hay servicios disponibles</h2>
             <p className="text-sm text-gray-500">Intenta más tarde.</p>
           </div>
         </C.Contenedor>
       );
  }

  return (
    <C.Contenedor titulo="Catalogo de Servicios" linkBack="-1">
      <C.Filtros campos={camposDisponibles} onBuscar={handleBuscar} />
      {filtradas !== null && (
        <div className="my-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-blue-800">
              Resultados de busqueda
            </h2>
            <button
              onClick={handleResetFiltro}
              className="px-2 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Ver todos los servicios
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
        {mostrarServicios.map((serv) => (
          <div
            key={serv?.servicio?.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="">
              <h2 className="text-md font-semibold text-gray-800">
                {serv.servicio?.nombre}
              </h2>
              <p className="text-sm text-gray-500">{serv.servicio?.descripcion}</p>
            </div>

            <p className="text-violet-700 font-bold text-lg">
              ${serv.servicio?.precio || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Stock: {serv.servicio?.stock ?? "0"}</p>
            
            {serv.servicio?.fecha_vencimiento && (
              <p className="text-xs text-gray-400">
                Vence: {serv.servicio?.fecha_vencimiento}
              </p>
            )}

            <Link
              onClick={() => {
                setServicioSeleccionado(serv.servicio);
                setShowModal(true);
              }}
              className=" inline-block text-sm text-violet-600 hover:underline"
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
          aceptar={handleSolicitar}
          titleButton="Solicitar"
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
