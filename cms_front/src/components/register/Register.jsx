import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const auth = useAuth(); // Obtén la función login del contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // La solicitud fue exitosa, guarda los datos en las cookies
      const responseData = await response.json();

      if (response.ok) {
        await toast.success("Cuenta registrada correctamente");

        // Esperar un momento y luego redirigir
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // Esperar 1 segundo antes de redirigir
      } else {
        let { errors } = responseData;
        console.error("Error al crea la cuenta");

        console.log(errors.email[0]);

        if (errors.email[0]) {
          toast.error(errors.email[0]);
        }
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
          <h1>Registrarse</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
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
              value={"Crear cuenta"}
            />
          </div>
          <div className="form-group">
            <Link to="/" className="btn btn-link w-100">
              Iniciar sesion
            </Link>
          </div>
        </form>

        <div>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
          />
        </div>
      </div>
    </>
  );
};

export default Register;
