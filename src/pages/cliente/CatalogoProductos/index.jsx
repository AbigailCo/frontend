import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import * as C from "../../../Components";
import { getProductosHabi } from "../../../util/cliente";
import { toast } from "react-toastify";
import { createSolicitud } from "../../../util/solicitudes";
import { filtroProdu } from "../../../util/productos";

const CatalogoProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const navigate = useNavigate();
  const [filtradas, setFiltradas] = useState(null); 
  const mostrarProductos = Array.isArray(filtradas) ? filtradas : productos ?? [];
  const handleResetFiltro = () => {
       setFiltradas(null);
     };
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
        proveedor_id: productoSeleccionado?.producto?.proveedor_id,
        producto_id: productoSeleccionado?.producto?.id,
        // mensaje_opcional: "",
        // fecha_solicitud: "",
        // fecha_respuesta: "",
      });
    }
  }, [showModal, productoSeleccionado]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/catalogo-productos");
  };

  const handleSolicitar = async () => {
    setLoading(true);
    setErrors({});
    console.log("form-----", form);
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
  
  const camposDisponibles = [
    { label: "Nombre producto", value: "nombre" },
    { label: "Codigo producto", value: "codigo" },
    { label: "Stock minimo", value: "stock_minimo" },
    { label: "Estado del producto", value: "estado_general" },
    { label: "Fecha de vencimiento", value: "fecha_vencimiento" },
    { label: "Producto ID", value: "producto_id" },
  ];
  const handleBuscar = async (payload) => {
    const respuesta = await filtroProdu(payload);
    setFiltradas(respuesta);
  };
  if (loading) {
    return <C.Cargando />;
  }

  if (productos.length === 0) {
    return (
      <C.Contenedor titulo="Catalogo de Productos" linkBack="-1">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold text-gray-800">No hay productos disponibles</h2>
          <p className="text-sm text-gray-500">Intenta más tarde.</p>
        </div>
      </C.Contenedor>
    );
  }
  

  return (
    <C.Contenedor titulo="Catalogo de Productos" linkBack="-1">
      <C.Filtros campos={camposDisponibles} onBuscar={handleBuscar}/>
             {filtradas !== null && (
               <div className="my-4 space-y-4">
                 <div className="flex justify-between items-center">
                   <h2 className="text-lg font-semibold text-blue-800">
                     Resultados de busqueda
                   </h2>
                   <button
                     onClick={handleResetFiltro}
                     className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
                   >
                     Ver todos los productos
                   </button>
                 </div>
       
               </div>
             )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
        {mostrarProductos.map((prod) => (
          <div
            key={prod.producto?.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {prod.producto?.nombre}
              </h2>
              <p className="text-sm text-gray-500">{prod.producto?.descripcion}</p>
            </div>

            <p className="text-violet-700 font-bold text-lg">
              ${prod.producto?.precio || "N/A"}
            </p>
            <p className="text-sm text-gray-600">Stock: {prod.producto?.stock ?? "0"}</p>
            {prod.producto?.fecha_vencimiento && (
              <p className="text-xs text-gray-400">
                Vence: {prod.producto?.fecha_vencimiento}
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
          titleButton="Solicitar"
          title={productoSeleccionado.producto?.nombre}
        >
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Descripcion:</strong> {productoSeleccionado.producto?.descripcion}
            </p>
            <p>
              <strong>Codigo:</strong> {productoSeleccionado.producto?.codigo}
            </p>
            <p>
              <strong>Precio:</strong> ${productoSeleccionado.producto?.precio}
            </p>
            <p>
              <strong>Stock:</strong> {productoSeleccionado.producto?.stock}
            </p>
            <p>
              <strong>Stock minimo:</strong> {productoSeleccionado.producto?.stock_minimo}
            </p>
            {productoSeleccionado.producto?.fecha_vencimiento && (
              <p>
                <strong>Vence:</strong> {productoSeleccionado.producto?.fecha_vencimiento}
              </p>
            )}
            {productoSeleccionado.categoria?.nombre && (
              <p>
                <strong>Categoria:</strong>{" "}
                {productoSeleccionado.categoria.nombre}
              </p>
            )}
          </div>
        </C.Modal>
      )}
    </C.Contenedor>
  );
};

export default CatalogoProductos;
