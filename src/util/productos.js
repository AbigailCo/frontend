import api from "./axios";

const filtroProdu = async (filtros) => {
 //   const user = JSON.parse(localStorage.getItem("user"));
   // console.log("user", user.id);
    //filtros.proveedor_id = user.id;
    const response = await api.post(`/api/productos-filtro`, filtros);
    console.log(response.data);
    return response.data;
  };

  export { filtroProdu };