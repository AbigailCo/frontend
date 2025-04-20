import React from "react";

const Modal = ({ isOpen, onClose, title, children, aceptar, titleButton = 'Aceptar'}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-violet-700 rounded-t-xl">
          <h2 className="text-lg font-semibold text-white">
            {title || "Modal"}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl hover:text-red-300 transition"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-gray-800 space-y-2">{children}</div>

        {/* Footer */}
        <div className="flex justify-end border-t px-5 py-4">
       
          <button
            onClick={aceptar}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition"
          >
            {titleButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
