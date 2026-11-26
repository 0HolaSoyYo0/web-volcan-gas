import api from './api';

export const ventaService = {
  obtenerTodas: async () => {
    const { data } = await api.get('/ventas');
    return data;
  },

  obtenerPorId: async (id) => {
    const { data } = await api.get(`/ventas/${id}`);
    return data;
  },

  crear: async (venta) => {
    const { data } = await api.post('/ventas', venta);
    return data;
  },

  actualizar: async (id, venta) => {
    const { data } = await api.put(`/ventas/${id}`, venta);
    return data;
  },

  eliminar: async (id) => {
    await api.delete(`/ventas/${id}`);
  },
};