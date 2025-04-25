import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createServ,
  editServ,
  getCategorias,
  getServicio,
} from "../../../../util/proveedores";
import * as C from "../../../../Components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const ServicioForm = () => {
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
      stock_minimo: "",
      fecha_vencimiento: "",
      categoria_id: "",
      duracion: "",
      ubicacion: "",
      horarios: [],
      dias: [],
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

    const fetchServicio = async () => {
      try {
        const servicioData = await getServicio(id);
        reset(servicioData);
      } catch (err) {
        console.error("Error al obtener el producto:", err);
      }
    };

    fetchCategorias();

    if (isEditMode) {
      fetchServicio();
    }
  }, [id, isEditMode, reset]);
  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (form) => {
    setLoading(true);
    try {
      let servData;
      if (isEditMode) {
        servData = await editServ(form, id);
        console.log("Servicio  editado:", servData.data);
        toast.success("Servicio actualizado correctamente");
      } else {
        servData = await createServ(form);
        toast.success("Servicio agregado correctamente");
        console.log("Servicio creado:", servData.data);
      }
      setLoading(false);
      navigate("/tus-servicios");
    } catch (error) {
      console.error("Error al crear el servicio:", error.servData?.data);
      toast.error("Servicio no creado");
      setLoading(false);
    }
  };
  return (
    <C.Contenedor linkBack="-1">
      <div className="max-w-sm mx-auto mt-10  bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">
          {isEditMode ? "Editar servicio" : "Agregar un servicio"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <h2 className="text-lg font-bold">Paso 1: Datos del servicio</h2>

              <div>
                <label className="block font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.nombre && <p>{errors.nombre.message}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Descripción
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("descripcion")}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Código
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("codigo", {
                    required: "El código es obligatorio",
                  })}
                />
                {errors.codigo && <p>{errors.codigo.message}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Fecha de vencimiento
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="date"
                  {...register("fecha_vencimiento")}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-bold">Paso 2: Precio y Stock</h2>

              <div>
                <label className="block font-medium text-gray-700">
                  Precio
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  {...register("precio", { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Stock</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Stock mínimo
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
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
                <label className="block font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  id="categoria_id"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("categoria_id", {
                    required: "Debe seleccionar un rol",
                  })}
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
          {step === 4 && (
            <>
              <h2 className="text-lg font-bold">Paso 4: Días y Horarios</h2>

              <div>
                <label className="block font-medium text-gray-700">
                  Días disponibles
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                    "Domingo",
                  ].map((dia, i) => (
                    <label key={i} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value={i + 1}
                        {...register("dias")}
                      />
                      {dia}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Horarios disponibles (separados por coma)
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Ej: 09:00, 10:30, 15:00"
                  {...register("horarios")}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Duración
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Ej: 30 minutos"
                  {...register("duracion")}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Ubicación
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("ubicacion")}
                />
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-700 transition"
                type="button"
                onClick={prevStep}
              >
                Atrás
              </button>
            )}
            {step < 4 && (
              <button
                className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
                type="button"
                onClick={nextStep}
              >
                Siguiente
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
              >
                {loading
                  ? isEditMode
                    ? "Guardando..."
                    : "Creando..."
                  : isEditMode
                  ? "Guardar cambios"
                  : "Agregar servicio"}
              </button>
            )}
          </div>
        </form>
      </div>
    </C.Contenedor>
  );
};

export default ServicioForm;
