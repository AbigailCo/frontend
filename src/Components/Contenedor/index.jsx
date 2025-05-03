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
  const handleBack = () => {
    if (linkBack === true) {
      navigate(-1);
    } else if (typeof linkBack === "number") {
      navigate(linkBack);
    } else if (typeof linkBack === "string") {
      navigate(linkBack);
    } else {
      navigate(-1);
    }
  }
  const getSizeClass = () => {
    switch (size) {
      case "full":
        return "w-full";
      case "sm":
        return "max-w-sm";
        case "xl":
          return "max-w-7xl";
      case "lg":
      default:
        return "max-w-5xl";
    }
  };

  return (
    <section className={`${getSizeClass()} mx-auto relative`}>
    <div className={width.width > 450 ? "rounded-lg bg-gray-100" : ""}>
      <div className="rounded-lg bg-white px-1 shadow-md">
        <div className="flex items-center gap-2 justify-between py-1">
          {linkBack && (
            <div className="flex items-center gap-2">
              <button
                className={`${
                  width.width < 576
                    ? "w-8 h-8 flex items-center justify-center rounded-full bg-violet-400 text-white hover:bg-violet-600"
                    : "flex items-center text-violet-500 text-sm font-medium hover:text-violet-700"
                }`}
                onClick={handleBack}
              >
                <ChevronLeft className={width.width < 576 ? "" : "mr-1"} />
                {width.width >= 576 && <span>Volver</span>}
              </button>
            </div>
          )}
          {titulo && (
            <h3 className="text-base font-semibold text-gray-800 text-center">
              {titulo}
            </h3>
          )}
          {menu && <>{menu}</>}
        </div>
        <hr className="border-gray-200" />
  
        {children}
      </div>
    </div>
  </section>
  );
};

export default Contenedor;
