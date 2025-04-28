import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProd, editProd, getCategorias, getProducto } from "../../../../util/proveedores";
import * as C from "../../../../Components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductoForm = () => {

  const { id } = useParams();
   const isEditMode = Boolean(id); // true si estamos editando
  const [step, setStep] = useState(1);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      nombre: "",
      descripcion: "",
      codigo: "",
      precio: "",
      stock: "",
      categoria_id: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await getCategorias();
        setCategorias(categoriasData);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
  
    const fetchProducto = async () => {
      try {
        const productoData = await getProducto(id);
        reset(productoData); 
      } catch (err) {
        console.error("Error al obtener el producto:", err);
      }
    };
  
    fetchCategorias();
  
    if (isEditMode) {
      fetchProducto();
    }
  }, [id, isEditMode, reset]);


  const nextStep = async () => {
    const valid = await trigger(); // valida solo los campos visibles
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (form) => {
    setLoading(true);
    try {

      let prodData;
      if (isEditMode) {
        prodData = await editProd(form, id);
        console.log("Product  editado:", prodData.data);
        toast.success("Producto actualizado correctamente");
      } else {
        prodData = await createProd(form);
        toast.success("Producto agregado correctamente");
        console.log("Producto creado:", prodData.data);
      }
      // const prodData = await createProd(form);
      setLoading(false);
      // reset();
    
      navigate("/productos");
    } catch (error) {
      console.error("Error al crear el producto:", error.prodData?.data);
      toast.error("Producto no creado");
      setLoading(false);
    }
  };
  return (
    <C.Contenedor linkBack>
      <div className="max-w-sm mx-auto mt-10  bg-white rounded-xl ">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">
        {isEditMode ? "Editar producto" : "Agregar un producto"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


          {step === 1 && (
            <>
              <h2 className="text-lg font-bold">Paso 1: Datos del producto</h2>

              <div>
                <label className="block font-medium text-gray-700">Nombre</label>
                <input className="w-full p-2 border border-gray-300 rounded"
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <p>{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Descripción</label>
                <input className="w-full p-2 border border-gray-300 rounded" {...register("descripcion")} />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Código</label>
                <input className="w-full p-2 border border-gray-300 rounded"
                  {...register("codigo", { required: "El código es obligatorio" })}
                />
                {errors.codigo && <p>{errors.codigo.message}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Fecha de vencimiento</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="date" {...register("fecha_vencimiento")} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-bold">Paso 2: Precio y Stock</h2>


              <div>
                <label className="block font-medium text-gray-700">Precio</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="number" {...register("precio", { valueAsNumber: true })} />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Stock</label>
                <input className="w-full p-2 border border-gray-300 rounded" type="number" {...register("stock", { valueAsNumber: true })} />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Stock mínimo</label>
                <input className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  {...register("stock_minimo", { valueAsNumber: true })}
                />
              </div>

            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-bold">Paso 3: Categoría</h2>

              <div>
                <label className="block font-medium text-gray-700">Categoría</label>
                <select
                  id="categoria_id"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("categoria_id", { required: "Debe seleccionar un rol" })}
                >
                  <option value="">Seleccione una categoria</option>
                  {categorias.length > 0 &&
                    categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                </select>

                {/* {errors?.categoria && <p className="text-red-500 text-sm">{errors.categoria.message}</p>} */}
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-700 transition" type="button" onClick={prevStep}>Atrás</button>}
            {step < 3 && (
              <button className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition" type="button" onClick={nextStep}>
                Siguiente
              </button>
            )}
            {step === 3 && <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
            >
                {loading ? (isEditMode ? "Guardando..." : "Creando...") : (isEditMode ? "Guardar cambios" : "Agregar producto")}
            </button>}
          </div>



        </form>
      </div>
    </C.Contenedor>);


};

export default ProductoForm;
