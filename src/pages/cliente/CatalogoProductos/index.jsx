import React, { use, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { getProductosHabi } from "../../../util/cliente";
import { toast } from "react-toastify";
import { createSolicitud } from "../../../util/solicitudes";

const CatalogoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
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

  useEffect(() => {
    console.log(productoSeleccionado, "ñ{ñ.s{a,c");
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
        proveedor_id: productoSeleccionado?.proveedor_id,
        producto_id: productoSeleccionado?.id,
        // mensaje_opcional: "",
        // fecha_solicitud: "",
        // fecha_respuesta: "",
      });
    }
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/catalogo-productos");
  };

  const handleSolicitar = async () => {
    setLoading(true);
    setErrors({});
    try {
      await createSolicitud(form);
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
    const fetchProductos = async () => {
      try {
        const productosData = await getProductosHabi();
        setProductos(productosData.data);
        console.log(productosData, "------");
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <C.Cargando />;
  }

  if (productos.length === 0) {
    return <p className="text-center mt-10">No hay productos disponibles.</p>;
  }

  return (
    <C.Contenedor titulo="Catalogo de Productos" linkBack="-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {prod.nombre}
              </h2>
              <p className="text-sm text-gray-500">{prod.descripcion}</p>
            </div>

            <p className="text-violet-700 font-bold text-lg">
              ${prod.precio || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Stock: {prod.stock ?? "0"}</p>
            {prod.fecha_vencimiento && (
              <p className="text-xs text-gray-400">
                Vence: {prod.fecha_vencimiento}
              </p>
            )}

            <Link
              onClick={() => {
                setProductoSeleccionado(prod);
                setShowModal(true);
              }}
              className="mt-4 inline-block text-sm text-violet-600 hover:underline"
            >
              Ver mas detalles
            </Link>
          </div>
        ))}
      </div>
      {showModal && productoSeleccionado && (
        <C.Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          aceptar={handleSolicitar}
          title={productoSeleccionado.nombre}
        >
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Descripcion:</strong> {productoSeleccionado.descripcion}
            </p>
            <p>
              <strong>Codigo:</strong> {productoSeleccionado.codigo}
            </p>
            <p>
              <strong>Precio:</strong> ${productoSeleccionado.precio}
            </p>
            <p>
              <strong>Stock:</strong> {productoSeleccionado.stock}
            </p>
            <p>
              <strong>Stock minimo:</strong> {productoSeleccionado.stock_minimo}
            </p>
            {productoSeleccionado.fecha_vencimiento && (
              <p>
                <strong>Vence:</strong> {productoSeleccionado.fecha_vencimiento}
              </p>
            )}
            {productoSeleccionado.categoria?.nombre && (
              <p>
                <strong>Categoria:</strong>{" "}
                {productoSeleccionado.categoria.nombre}
              </p>
            )}
          </div>
          {/* <div className="flex justify-end mt-4">
            <button
              onClick={handleCloseModal}
              className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition"
            >
              Solicitar
            </button>
          </div> */}
        </C.Modal>
      )}
    </C.Contenedor>
  );
};

export default CatalogoProductos;
