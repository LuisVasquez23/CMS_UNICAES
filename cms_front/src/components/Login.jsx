import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth(); // Obtén la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const data = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // La solicitud fue exitosa, guarda los datos en las cookies
        const responseData = await response.json();

        // Utiliza js-cookie para guardar datos en las cookies
        Cookies.set("token", responseData.token, { expires: 7 }); // Ejemplo: guarda un token con una duración de 7 días

        auth.login();

        
      } else {
        // Manejar errores, mostrar un mensaje de error, etc.
        console.error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Iniciar sesión</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="email">Correo:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn-primary btn w-100"
              value={"Iniciar sesión"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
