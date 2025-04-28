import { useState } from "react";

const HorariosInput = ({ horarios, onChange }) => {
    const [inputHorario, setInputHorario] = useState("");
  
    const agregarHorario = () => {
      if (!inputHorario) return;
      if (!horarios.includes(inputHorario)) {
        const nuevosHorarios = [...horarios, inputHorario];
        onChange(nuevosHorarios);
      }
      setInputHorario("");
    };
  
    const eliminarHorario = (horario) => {
      const nuevosHorarios = horarios.filter((h) => h !== horario);
      onChange(nuevosHorarios);
    };
  
    return (
      <div>
        <div className="flex gap-2 mb-2">
          <input
            type="time"
            value={inputHorario}
            onChange={(e) => setInputHorario(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={agregarHorario}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {horarios.map((hora, idx) => (
            <div key={idx} className="flex items-center bg-gray-200 px-2 py-1 rounded">
              {hora}
              <button
                type="button"
                onClick={() => eliminarHorario(hora)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HorariosInput;
  