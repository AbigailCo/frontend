import { Link, useLocation } from "react-router-dom";
import { SquareMousePointer, ScanBarcode  } from "lucide-react";

const Menu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    // { path: "/", label: "Inicio", icon: <Home size={18} /> },
    { path: "/catalogo-productos", label: "Productos", icon: <SquareMousePointer size={18}/> },
    { path: "/catalogo-servicios", label: "Servicios", icon:  <ScanBarcode   size={18} /> },
  ];

  return (
    <div className="flex justify-center mt-6">
      <div className="flex flex-wrap gap-4 bg-white shadow-lg p-4 rounded-2xl border border-gray-200">
   
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm focus:outline-none transition-all
              ${
                isActive(item.path)
                  ? "bg-violet-600 text-white shadow-inner"
                  : "bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600"
              }`}
            role="button"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
