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
import { Paso1, Paso2, Paso3, Paso4 } from "./Step";
const ServicioForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
    setValue,
    watch,
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
      dias_disponibles: [],
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
        const { servicio, categoria} = await getServicio(id);
        
        // 1) Horarios: si ya es array, úsalo; si es string, parsealo; si no existe, array vacío
        let horariosArray = [];
        if (Array.isArray(servicio.horarios)) {
          horariosArray = servicio.horarios;
        } else if (typeof servicio.horarios === "string" && servicio.horarios) {
          try {
            horariosArray = JSON.parse(servicio.horarios);
          } catch {
            horariosArray = [];
          }
        }
    
        // 2) Días disponibles: servicio.dias_disponibles viene como array de objetos {id,…}
        const diasArray = Array.isArray(servicio.dias_disponibles)
          ? servicio.dias_disponibles.map((d) => d.id)
          : [];
    
        // 3) Armar el objeto para resetear el form
        const servicioDataWithCorrectFormat = {
          nombre: servicio.nombre,
          descripcion: servicio.descripcion,
          codigo: servicio.codigo,
          stock: servicio.stock,
          stock_minimo: servicio.stock_minimo,
          precio: servicio.precio,
          fecha_vencimiento: servicio.fecha_vencimiento,
          categoria_id: categoria.id,
          duracion: servicio.duracion,
          ubicacion: servicio.ubicacion,
          horarios: horariosArray,
          dias_disponibles: diasArray,
        };
    
        reset(servicioDataWithCorrectFormat);
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
    console.log("mi formulario en el front",form)
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
  const handleDiaChange = (e, id) => {

    const diasSeleccionados = (getValues("dias_disponibles") || []).map(Number);
   
  if (e.target.checked) {

    setValue("dias_disponibles", [...diasSeleccionados, id]);
  } else {
 
    setValue(
      "dias_disponibles",
      diasSeleccionados.filter((dia) => dia !== id)
    );
  }
  };
  return (
    <C.Contenedor linkBack="-1">
      <div className="max-w-sm mx-auto mt-10  bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">
          {isEditMode ? "Editar servicio" : "Agregar un servicio"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && <Paso1 register={register} errors={errors} watch={watch} />}
          {step === 2 && <Paso2 register={register} watch={watch} />}
          {step === 3 && <Paso3 register={register} categorias={categorias} watch={watch} />}
          {step === 4 && (
            <Paso4
              register={register}
              getValues={getValues}
              setValue={setValue}
              handleDiaChange={handleDiaChange}
              watch={watch} 
            />
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
