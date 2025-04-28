import React, { useEffect, useState } from "react";
import { getDiasSemana } from "../../../../../util/servicios";
import * as C from "../../../../../Components";
import * as S from "./"

const Paso4DiasHorarios = ({
  register,
  watch,
  setValue,
  handleDiaChange,
}) => {
  const [diasSemana, setDiasSemana] = useState([]);
  useEffect(() => {
    getDiasSemana()
      .then((data) => setDiasSemana(data))
      .catch(console.error);
  }, []);
  const selectedDias = watch("dias_disponibles") || [];
  const horarios = watch("horarios") || [];

  return (
    <>
      <h2 className="text-lg font-bold">Paso 4: Días y Horarios</h2>


      <div>
        <label className="block font-medium text-gray-700">
          Días disponibles
        </label>
        <div className="flex flex-wrap gap-2">
          {!diasSemana.length && <C.Cargando />}
          {diasSemana.map((dia) => (
            <label key={dia.id} className="flex items-center gap-1">
              <input
                type="checkbox"

                value={dia.id}

                onChange={(e) => handleDiaChange(e, dia.id)}

                checked={selectedDias.includes(dia.id)}
              />
              {dia.nombre}
            </label>
          ))}

          <input
            type="hidden"
            {...register("dias_disponibles", { value: selectedDias })}
          />
        </div>
      </div>


      <div>
        <label className="block font-medium text-gray-700">
          Horarios disponibles
        </label>
        <S.Horarios
          horarios={horarios}
    
          onChange={(newList) => setValue("horarios", newList)}
        />
      </div>


      <div>
        <label className="block font-medium text-gray-700">Duración</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Ej: 30 minutos"
          {...register("duracion")}
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Ubicación</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          {...register("ubicacion")}
        />
      </div>
    </>
  );
};
export default Paso4DiasHorarios;
