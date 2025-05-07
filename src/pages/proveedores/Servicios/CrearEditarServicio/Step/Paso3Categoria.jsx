import React from 'react'

const Paso3Categoria = ({ register, categorias}) => {

 
  return (
    <>
              <h2 className="text-lg font-bold">Paso 1: Categoría</h2>

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
  )
}
export default Paso3Categoria;