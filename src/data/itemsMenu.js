/**
 * Elementos de navegación del menú principal.
 *
 * Cada elemento define una ruta de navegación y el texto
 * que se mostrará como enlace en la interfaz.
 *
 * @type {{ path: string, label: string }[]}
 */
export const itemsMenu = [
	{ path: "/", label: "Inicio", publico: true },
	{ path: '/catalogo', label: 'Catálogo', publico: true },
	{ path: '/nosotros', label: 'Nosotros', publico: true },
	{ path: '/carrito', label: 'Carrito', roles: ['USER', 'ADMIN'] },
	{ path: '/admin/productos', label: 'Administrar Productos', roles: ['ADMIN'] },

];
