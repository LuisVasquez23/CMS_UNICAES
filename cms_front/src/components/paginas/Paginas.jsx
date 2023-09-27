import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import { Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const Pagina = ({ page, handleDeletePage }) => {

  const navigate = useNavigate();


  const openPageInNewTab = (pageId) => {
    const url = `http://127.0.0.1:8000/api/pages/${pageId}/html`;
  
    const newWindow = window.open('', '_blank');
  
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vista previa</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        </head>
        <body>
          <div id="root"></div>
          <script>
            fetch('${url}')
              .then(response => response.text())
              .then(htmlContent => {
                const root = document.getElementById('root');
                root.innerHTML = htmlContent;
              });
          </script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
        </body>
        </html>
      `);
    }
  };
  

  return (
    <Col md={4}>
      <ul className="mt-5">
        <li key={page.id}>
          <h3 className="fw-semibold fs-3">Titulo: {page.title}</h3>
          <p onClick={() => openPageInNewTab(page.id)} style={{ cursor: 'pointer' }}s>url: <a className="link-opacity-100-hover">{page.url}</a></p>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary"
            onClick={() => navigate(`/dashboard/paginas/edit/${page.id}`)}
            >Editar
            </button>
       
            <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => handleDeletePage(page.id)}

            >Eliminar
            </button>

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


  const handleDeletePage = async (pageId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/pages/${pageId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "¡Página eliminada!",
              text: "Se ha eliminado la página correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
  
            setTimeout(() => {
              window.location.href = "/dashboard/paginas";
            }, 2000);
          } else {
            console.error("Error al eliminar la página");
            Swal.fire({
              icon: "error",
              title: "Error al eliminar la página",
              text: "Ocurrió un error al eliminar la página.",
            });
          }
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        }
      }
    });
  };
  
  
  

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
                        <Pagina page={page} handleDeletePage={handleDeletePage} />
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
