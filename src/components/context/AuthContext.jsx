import { createContext, useContext, useState } from 'react';
import { authService } from '../../services/authService';

const AuthContext = createContext(null);

const normalizarRol = (rolRaw) => {
  if (!rolRaw) return null;
  return rolRaw.replace('ROLE_', '').toUpperCase(); // "ROLE_ADMIN" -> "ADMIN"
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [rol, setRol] = useState(() => localStorage.getItem('rol'));
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  const guardarSesion = (data, emailFallback = '') => {
    const rolLimpio = normalizarRol(data.rol);
    const infoUsuario = {
      email: data.email || emailFallback,
      nombre: data.nombre || data.email || emailFallback,
      rol: rolLimpio,
    };

    localStorage.setItem('token', data.token);
    if (rolLimpio) localStorage.setItem('rol', rolLimpio);
    localStorage.setItem('usuario', JSON.stringify(infoUsuario));

    setToken(data.token);
    setRol(rolLimpio);
    setUsuario(infoUsuario);
  };

  const login = async (credenciales) => {
    const data = await authService.login(credenciales);
    guardarSesion(data, credenciales.email);
    return data;
  };

  const register = async (datosRegistro) => {
    const data = await authService.register(datosRegistro);
    if (data?.token) {
      guardarSesion(data, datosRegistro.email);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuario');
    setToken(null);
    setRol(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        rol,
        estaAutenticado: Boolean(token),
        esAdmin: rol === 'ADMIN',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};