import { useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";


export default function FiltroDinamico({ campos, onBuscar }) {
  const [filtros, setFiltros] = useState([{ campo: "", valor: "" }]);

  const handleChange = (index, key, value) => {
    const nuevosFiltros = [...filtros];
    nuevosFiltros[index][key] = value;
    setFiltros(nuevosFiltros);
  };

  const agregarFiltro = () => {
    setFiltros([...filtros, { campo: "", valor: "" }]);
  };

  const quitarFiltro = (index) => {
    setFiltros(filtros.filter((_, i) => i !== index));
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    const payload = {};
    filtros.forEach(({ campo, valor }) => {
      if (campo && valor !== "") {
        payload[campo] = valor;
      }
    });

    try {
      await onBuscar(payload); 
     
    } catch (err) {
      console.error("Error al buscar:", err);
    }
  };

  return (
    <form
      onSubmit={handleBuscar}
      className="space-y-4 bg-white p-1 rounded-2xl max-w-3xl mx-auto"
    >
      <h1>Filtra por campos</h1>
      {filtros.map((filtro, index) => (
        <div
          key={index}
          className="flex items-center justify-center gap-2 text-sm"
        >
          <select
            className="w-full md:w-1/3 p-1 border rounded-lg"
            value={filtro.campo}
            onChange={(e) => handleChange(index, "campo", e.target.value)}
          >
            <option value="">Seleccionar</option>
            {campos.map((campo) => (
              <option key={campo.value} value={campo.value}>
                {campo.label}
              </option>
            ))}
          </select>

          <input
            className="w-full md:w-1/3 p-1 border rounded-lg"
            type={filtro.campo === "fecha_vencimiento" ? "date" : "text"}
            placeholder={`Ingrese ${filtro.campo}`}
            value={filtro.valor}
            onChange={(e) => handleChange(index, "valor", e.target.value)}
          />

          {filtros.length > 1 && (
            <button
              type="button"
              onClick={() => quitarFiltro(index)}
              className="text-red-500 hover:text-red-700"
              title="Quitar filtro"
            >
              <Trash2 size={20}/>
            </button>
          )}
        </div>
      ))}
      <div className="flex flex-wrap justify-center items-center gap-4">
        <button
          type="button"
          onClick={agregarFiltro}
          className="flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition"
        >
          <Plus size={18} />
          Agregar filtro
        </button>

        <button
          type="submit"
          className="flex items-center px-2 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <Search size={18} />
          Buscar
        </button>
      </div>

      
    </form>
  );
}
