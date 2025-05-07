import React from "react";
const Paso2PrecioStock = ({ register, categoriaNombre, watch }) => {
  return (
    <>
      <h2 className="text-lg font-bold">Paso 2:Selecciones Precio</h2>

      <div>
        <label className="block font-medium text-gray-700">Precio</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          {...register("precio", { valueAsNumber: true })}
        />
      </div>

      {categoriaNombre === "producto" && (
        <>
          <h2 className="text-md font-bold">Defina el stock del producto</h2>

          <div>
            <label className="block font-medium text-gray-700">Stock</label>
            <input
              value={watch("stock") || ""}
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("stock", { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Stock mínimo
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              value={watch("stock_minimo") || ""}
              type="number"
              {...register("stock_minimo", { valueAsNumber: true })}
            />
          </div>
        </>
      )}
    </>
  );
};
export default Paso2PrecioStock;
