export { default as Home  } from './Home';

//Sesion
export { default as Login  } from './Sesion/Login';
export { default as Registro  } from './Sesion/RegisterForm';
export { default as  ForgotPassword} from './Sesion/ForgotPassword';
export { default as  ResetPassword} from './Sesion/ResetPassword';
export { default as  Logout} from './Sesion/Logout';
export { default as  Panel} from './Panel';
export { default as  Editar} from './Sesion/EditProfile';

//Rol clientes - admin 
export { default as  Inventario} from './Inventario';
export { default as  Categorias} from './Categorias';

//Rol Admin
export { default as Usuarios} from './admin/Usuarios'
export { default as UsuarioEdit} from './admin/UserEdit'
export { default as RegisterUsuario} from './admin/RegisterUsuario'

//Rol Proveedor
export { default as Productos} from './proveedores/Productos'
export { default as CreateEditProducto} from './proveedores/Productos/CrearEditarProducto'

export { default as Servicios} from './proveedores/Servicios'
export { default as CreateEditServicio} from './proveedores/Servicios/CrearEditarServicio'

export { default as Solicitudes} from './proveedores/Solicitudes'

//Rol Cliente
export { default as CatalogoProductos} from './cliente/CatalogoProductos'
export { default as CatalogoServicios} from './cliente/CatalogoServicios'
export { default as SolicitudesCliente} from './cliente/Solicitudes'