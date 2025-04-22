import { useState } from "react";
import { filtroSoli } from "../../../../util/solicitudes";
import { Plus, Trash2, Search } from "lucide-react"; // �conos

const camposDisponibles = [
  { label: "Nombre servicio/producto", value: "nombre" },
  { label: "Codigo servicio/producto", value: "codigo" },
  { label: "Stock minimo", value: "stock_minimo" },
  { label: "Nombre del cliente", value: "cliente" },
  { label: "Estado de la solicitud", value: "estado_general" },
  { label: "Fecha de vencimiento", value: "fecha_vencimiento" },
  { label: "Producto ID", value: "producto_id" },
  { label: "Servicio ID", value: "servicio_id" },
];

export default function FiltroDinamico({ onResultados }) {
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
    const nuevosFiltros = filtros.filter((_, i) => i !== index);
    setFiltros(nuevosFiltros);
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
        console.log("payload", payload);
      const data  = await filtroSoli(payload);
      console.log("data", data);
      onResultados(data);
    } catch (err) {
      console.error("Error al buscar solicitudes:", err);
    }
  };

  return (
    <form onSubmit={handleBuscar} className="space-y-4 bg-white p-2 rounded-2xl shadow-lg max-w-3xl mx-auto">
      {filtros.map((filtro, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-3 items-center rounded-xl shadow-sm"
        >
          <select
            className="w-full md:w-1/3 p-2 border rounded-lg"
            value={filtro.campo}
            onChange={(e) => handleChange(index, "campo", e.target.value)}
          >
            <option value="">Seleccionar</option>
            {camposDisponibles.map((campo) => (
              <option key={campo.value} value={campo.value}>
                {campo.label}
              </option>
            ))}
          </select>

          <input
            className="w-full md:w-1/3 p-2 border rounded-lg"
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
              <Trash2 />
            </button>
          )}
        </div>
      ))}

      <div className="flex flex-wrap justify-between items-center gap-4">
        <button
          type="button"
          onClick={agregarFiltro}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition"
        >
          <Plus size={18} />
          Agregar filtro
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <Search size={18} />
          Buscar
        </button>
      </div>
    </form>
  );
}
