import React from "react";
const Paso1DatosServicio = ({ register, errors, watch, categoriaNombre }) => {
  return (
    <>
      <h2 className="text-lg font-bold">Paso 2: Datos del servicio</h2>

      <div>
        <label className="block font-medium text-gray-700">Nombre</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={watch("nombre") || ""}
          {...register("nombre", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Código</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={watch("codigo") || ""}
          {...register("codigo", {
            required: "El código es obligatorio",
          })}

        />
        {errors.codigo && <p>{errors.codigo.message}</p>}
      </div>
      <div>
            <label className="block font-medium text-gray-700">
              Descripción
            </label>
            <input
              value={watch("descripcion") || ""}
              className="w-full p-2 border border-gray-300 rounded"
              {...register("descripcion")}
            />
          </div>
      {categoriaNombre === "producto" && (
        <>
        
          <div>
            <label className="block font-medium text-gray-700">
              Fecha de vencimiento
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              value={watch("fecha_vencimiento") || ""}
              type="date"
              {...register("fecha_vencimiento")}
            />
          </div>
        </>
      )}
    </>
  );
};
export default Paso1DatosServicio;
