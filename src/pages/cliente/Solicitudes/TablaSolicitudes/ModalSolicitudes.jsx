import React from "react";

import * as C from "../../../../Components";

const ModalSolicitud = ({ isOpen, onClose, solicitud, aceptar }) => {
  

    return (
       <C.Modal
                 isOpen={isOpen}
                 onClose={onClose}
                 title={solicitud.cliente?.nombre}
                aceptar={aceptar}
                titleButton="Cerrar"
               >
                 <div className="space-y-2 text-sm text-gray-700">
                   <p
                     className={
                        solicitud.estado.nombre === "Aprobada"
                         ? "text-green-500"
                         : ""
                     }
                   >
                     <strong>Estado de la solicitud:</strong>{" "}
                     {solicitud.estado.nombre}
                   </p>
                  
                   <p>
                     <strong>Proveedor:</strong>{" "}
                     {solicitud.proveedor?.nombre}
                   </p>
                   <p>
                     <strong>Contacto:</strong>{" "}
                     {solicitud.proveedor?.contacto}
                   </p> 
                   <p>
                     <strong>Fecha reserva:</strong>{" "}
                     {solicitud.fecha_reserva}
                   </p>
                   <p>
                     <strong>Hora reserva:</strong>{" "}
                     {solicitud.hora_reserva}
                   </p>
                  
                  
                   {solicitud.servicio ||
                   solicitud.producto ? (
                     <>
                       {(() => {
                         const item =
                           solicitud.servicio ||
                           solicitud.producto;
                         return (
                           <>
                             <p>
                               <strong>Servicio/Producto:</strong> {item?.nombre}
                             </p>
                           
                             <p>
                               <strong>Precio: $</strong> {item?.precio}
                             </p>
                            
                           </>
                         );
                       })()}
                     </>
                   ) : null}
                 </div>
               </C.Modal>
    );
};

export default ModalSolicitud;
