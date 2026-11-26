import api from './api';

export const authService = {
  login: async (credenciales) => {
    // credenciales: { email, password }
    const { data } = await api.post('/auth/login', credenciales);
    return data; // Esperado: { token, email, rol, ... }
  },

  register: async (datosRegistro) => {
    // datosRegistro: { nombre, email, password, ... }
    const { data } = await api.post('/auth/register', datosRegistro);
    return data;
  },
};