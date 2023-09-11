import Cookies from "js-cookie";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      // Puedes ajustar la URL de la API según tu configuración
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Cuerpo de la solicitud si es necesario
      });

      if (response.ok) {
        const responseData = await response.json(); // Obtén los datos de la respuesta
        console.log("Respuesta exitosa:", responseData);
        Cookies.remove("token");

        auth.logout();

        navigate("/");
      } else {
        // Maneja errores, muestra mensajes de error, etc.
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de logout:", error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleLogout}>
          <button type="submit" className="btn btn-success">
            Cerrar Session
          </button>
        </form>
      </div>
    </>
  );
};

export default Logout;
