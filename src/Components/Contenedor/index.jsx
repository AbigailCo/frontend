import { useNavigate } from "react-router-dom";
import useWindowSize from "../../Hook/useWindowSize";
import { ChevronLeft } from "lucide-react";

const Contenedor = ({
  menu,
  children,
  titulo = "",
  linkBack = false,
  size = "lg",
}) => {
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
    <section className={`${getSizeClass()} mx-auto mb-5 pb-5 relative `}>
      <div className={width.width > 450 ? "rounded-lg p-1 bg-gray-100" : ""}>
        <div className="rounded-lg bg-white p-4 pb-6 shadow-md">
          {linkBack && (
            <div className="flex items-center gap-4 justify-between">
              <button
                className={`${
                  width.width < 576
                    ? "w-10 h-10 flex items-center justify-center rounded-full bg-violet-400 text-white hover:bg-violet-600"
                    : "flex items-center text-violet-500 font-medium hover:text-violet-700"
                }`}
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className={width.width < 576 ? "" : "mr-2"} />
                {width.width >= 576 && <span>Volver</span>}
              </button>
              {titulo && (
                <>
                  <h3 className="text-center text-xl font-bold text-gray-800">
                    {titulo}
                  </h3>
                </>
              )}
            </div>
          )}
          <hr className=" border-gray-300" />
          {menu && <>{menu}</>}
          {children}
        </div>
      </div>
    </section>
  );
};

export default Contenedor;
