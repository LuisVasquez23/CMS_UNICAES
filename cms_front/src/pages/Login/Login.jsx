import { useState } from "react";
import "../../assets/css/loginStyles.css";

const Login = () => {
  // Valores de datos
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Estados para controlar la validación de campos
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // Metodos de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { email, password } = formData;

    if (email === "") {
      setEmailValid(false);
    }

    if (password === "") {
      setPasswordValid(false);
      return;
    }

    // Configura los datos de inicio de sesión para enviar al servidor
    const datosInicioSesion = {
      email,
      password,
    };

    try {
      // Realiza la solicitud POST al servidor para iniciar sesión
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosInicioSesion),
      });

      if (response.ok) {
        // La solicitud fue exitosa, obtén el token de autenticación
        const data = await response.json();
        const { token } = data;

        console.log(token);

        // Almacena el token en el estado o en el almacenamiento local (localStorage)
        // Esto dependerá de cómo desees gestionar la autenticación en tu aplicación
        // Por ejemplo:
        // setToken(token); // Si utilizas estado en tu componente
        // localStorage.setItem('token', token); // Si utilizas localStorage

        // Luego puedes redirigir al usuario a otra página o realizar otras acciones
        // después de que hayan iniciado sesión con éxito.
      } else {
        // La solicitud no fue exitosa, maneja el error
        console.error("Error al iniciar sesión:", response.statusText);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      }
    } catch (error) {
      console.error(
        "Error al realizar la solicitud de inicio de sesión:",
        error
      );
      // Maneja cualquier error de red o excepción aquí
    }
  };

  return (
    <>
      <div className="login-container" id="login-container">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="body-form">
            <div className="form-group">
              <h2 className="text-muted text-center">Iniciar sesion</h2>
              <hr />
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${emailValid ? "" : "is-invalid"}`}
              />
              {!emailValid && (
                <div className="invalid-feedback">
                  Por favor revisa el campo del correo.
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña: </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${passwordValid ? "" : "is-invalid"}`}
              />
              {!passwordValid && (
                <div className="invalid-feedback">
                  Por favor revisa el campo de la contraseña.
                </div>
              )}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-login">
                Iniciar sesión
              </button>
            </div>

            <div className="form-group text-center">
              <a href="">¿Olvidaste tu contraseña?</a>
              <hr />
              <a href="" className="btn btn-login" id="btn-crearCuenta">
                Crear una cuenta
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
