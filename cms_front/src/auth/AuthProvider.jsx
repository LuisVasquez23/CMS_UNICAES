import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []); // Este efecto se ejecuta solo una vez al cargar la aplicación

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token"); // Elimina la cookie 'token'
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
