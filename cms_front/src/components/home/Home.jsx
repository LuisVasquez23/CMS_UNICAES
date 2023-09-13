import Cookies from "js-cookie";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

const Home = () => {
  const userName = Cookies.get("userName");
  const pageCount = Cookies.get("pageCount");

  const pageCountNumber = parseInt(pageCount);

  return (
    <>
      <h2 className="text-center mt-5 fw-semibold">Bienvenido, {userName}</h2>
      <p className="text-center fw-light">
        Te presentamos un resumen de tu actividad en nuestro sitio web
      </p>

      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-12">
            <div className="card text-dark  mb-3">
              <div className="card-header fw-bold fs-5 text-primary-emphasis">
                <i className="fw-bold fa fa-file"></i> Paginas creadas
              </div>
              <div className="card-body text-center">
                {pageCountNumber > 0 ? (
                  <h5 className="card-title display-5">{pageCount}</h5>
                ) : (
                  <p className="fw-semibold mt-3 mb-3">
                    No tienes páginas creadas.
                  </p>
                )}

                <Link
                  to="/dashboard/paginas/create"
                  className="btn btn-success mt-2"
                >
                  <i className="fa fa-plus me-1"></i>
                  Crear una nueva pagina
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
