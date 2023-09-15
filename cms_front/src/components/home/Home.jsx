import Cookies from "js-cookie";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const userName = Cookies.get("userName");
  const userId = Cookies.get("userId");

  const [pageCount, setPageCount] = useState(0); 


  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/page-count/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setPageCount(data.pageCount); // Establece el estado pageCount
        } else {
          console.error("Error al obtener la cantidad de páginas del usuario");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
    fetchPages();
  }, [userId]);




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

              {pageCount > 0 ? (
                <h5 className="card-title display-5">{pageCount}</h5>
              ) : (
                <p className="fw-semibold mt-3 mb-3">No tienes páginas creadas.</p>
              )}

                <Link
                  to="/dashboard/paginas"
                  className="btn btn-success mt-2"
                >
                  <i className="fa fa-eye me-1"></i>
                  Ver tus páginas
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
