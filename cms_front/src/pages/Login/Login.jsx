import "../../assets/css/loginStyles.css";

const Login = () => {
  return (
    <>
      <div className="login-container" id="login-container">
        <form className="loginForm">
          <h2 className="text-center">Iniciar sesion</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Iniciar sesion"
              className="btn btn-login"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
