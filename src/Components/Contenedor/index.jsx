import { useNavigate } from "react-router-dom";
import useWindowSize from "../../Hook/useWindowSize";
import { ChevronLeft } from "lucide-react";

const Contenedor = ({ children, titulo = "", linkBack = "", size = "lg" }) => {
  const width = useWindowSize();
  const navigate = useNavigate();

  const getSizeClass = () => {
    switch (size) {
      case "full":
        return "w-full";
      case "sm":
        return "max-w-sm";
      case "lg":
      default:
        return "max-w-5xl";
    }
  };

  return (
    <section className={`${getSizeClass()} mx-auto mb-5 mt-5 pb-5 relative px-4`}>
      <div className={width.width > 450 ? "rounded-lg p-3 bg-gray-100" : ""}>
        <div className="rounded-lg bg-white p-4 pb-6 shadow-md">
          {linkBack && (
            <div className="flex items-center gap-4 justify-between">
              <button
                className={`${
                  width.width < 576
                    ? "w-10 h-10 flex items-center justify-center rounded-full bg-violet-400 text-white hover:bg-violet-600"
                    : "flex items-center text-violet-500 font-medium hover:text-violet-700"
                }`}
                onClick={() => navigate(linkBack)}
              >
                <ChevronLeft className={width.width < 576 ? "" : "mr-2"} />
                {width.width >= 576 && <span>Volver</span>}
              </button>
            </div>
          )}

          {titulo && (
            <>
              <hr className="my-3 border-gray-300" />
              <h3 className="text-center text-xl font-bold mb-4 text-gray-800">
                {titulo}
              </h3>
            </>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default Contenedor;