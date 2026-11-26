import api from './api';

export const productoService = {
  obtenerTodos: async () => {
    const { data } = await api.get('/productos');
    return data;
  },

  obtenerPorId: async (id) => {
    const { data } = await api.get(`/productos/${id}`);
    return data;
  },

  crear: async (producto) => {
    const { data } = await api.post('/productos', producto);
    return data;
  },

  actualizar: async (id, producto) => {
    const { data } = await api.put(`/productos/${id}`, producto);
    return data;
  },

  eliminar: async (id) => {
    await api.delete(`/productos/${id}`);
  },
};