import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createServ,
  editServ, 
  getServicio,
} from "../../../../util/servicios";
import { getCategorias } from "../../../../util/generales";
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
        const response = await getServicio(id);
       // console.log("respuesta del servicio", response);
        const { servicio, categoria, dias_disponibles} = response.data;
      
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
 
        const diasArray = Array.isArray(dias_disponibles)
          ? dias_disponibles.map((d) => d.id)
          : [];

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
   // console.log("mi formulario en el front",form)
    setLoading(true);
    try {

      if (isEditMode) {
       await editServ(form, id);
        toast.success("Servicio actualizado correctamente");
      } else {
        await createServ(form);
        toast.success("Servicio agregado correctamente");
      }

      setLoading(false);
      navigate("/tus-servicios");
    } catch (error) {
      console.error("Error con el servicio:", error.servData?.data);
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
    <C.Contenedor linkBack>
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
