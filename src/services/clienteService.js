import api from './api';

export const clienteService = {
  obtenerTodos: async () => {
    const { data } = await api.get('/clientes');
    return data;
  },

  obtenerPorId: async (id) => {
    const { data } = await api.get(`/clientes/${id}`);
    return data;
  },

  crear: async (cliente) => {
    const { data } = await api.post('/clientes', cliente);
    return data;
  },

  actualizar: async (id, cliente) => {
    const { data } = await api.put(`/clientes/${id}`, cliente);
    return data;
  },

  eliminar: async (id) => {
    await api.delete(`/clientes/${id}`);
  },
};