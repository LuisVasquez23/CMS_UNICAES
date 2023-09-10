import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hooks
  // Hook para log out
  function SignOut() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  // Verificar si existe un token en localStorage al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Si existe un token, consideramos al usuario como autenticado
      setIsAuthenticated(true);
    } else {
      // Si no hay token, el usuario no está autenticado
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext({
  isAuthenticated: false,
  SignOut: () => {},
});

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
