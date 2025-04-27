import React from "react";

const Cargando = ({ size = 12 }) => {

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 border-solid`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    </div>
  );
};

export default Cargando;