import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';


const Pagina = ({ page }) => {
  return (
    <Col md={6}>
      <ul className="mt-5">
        <li key={page.id}>
          <h3 className="fw-semibold">Titulo: {page.title}</h3>
          <p className="fw-normal">url: {page.url}</p>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary">Editar</button>
            <button type="button" className="btn btn-danger">Eliminar</button>
          </div>
        </li>
      </ul>
    </Col>
  );
};


const Paginas = () => {

  const userId = Cookies.get("userId");
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function fetchPages() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/pages/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setPages(data);
        } else {
          console.error("Error al obtener las páginas del usuario");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }finally {
        setIsLoading(false);
      }
    }

    fetchPages();
  }, [userId]);

  return (
    <>
    <div className="text-center">

 
      <h2 className="fw-semibold text-primary mt-4">
        Listado de tus páginas creadas
      </h2>
        
      <Link to="/dashboard/paginas/create" className="btn btn-success mb-3 align-items-center mt-3">
        <i className="fa fa-plus me-1"></i>
        Crear una nueva
      </Link>
      
      <div className="container">

      {isLoading ? (
            <p className="mt-3 fs-5">Cargando...</p>
          ) : (
            <>
              {pages.length === 0 ? (
                <p className="mt-3 fs-5">No tienes páginas creadas, creemos una!</p>
              ) : (
                    <Row>
                    {pages.map((page, index) => (
                      <React.Fragment key={page.id}>
                        <Pagina page={page} />
                        {index % 3 === 2 && <div className="w-100"></div>}
                      </React.Fragment>
                    ))}
                  </Row>
            )}
            </>
          )}

      </div>
</div>
    </>
  );


};

export default Paginas;
