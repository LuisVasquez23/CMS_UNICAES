import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Paginascreate = () => {

const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};

  const [data, setData] = useState([]);
  const [selectedHtml, setSelectedHtml] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');

useEffect(() => {
      // Realizamos una solicitud a la API
      fetch('http://127.0.0.1:8000/api/etiquetas')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
}, []);                       

useEffect(() => {
    // Actualiza la vista previa cuando se cambia el contenido principal
    setPreviewHtml(selectedHtml);
}, [selectedHtml]);

const handleDragStart = (e, estructuraHtml) => {
    e.dataTransfer.setData('text/plain', estructuraHtml);
    setIsDragging(true);
};

const handleDragEnd = () => {
setIsDragging(false);
};

const handleTextAreaChange = (e) => {
setSelectedHtml(e.target.value);
};



const handleDelete = () => {
setSelectedHtml('');
};

const getInnerHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent;
};


useEffect(() => {
const bootstrapHtml = `<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bootstrap demo</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
 </head>

<body>

<h1>Hello, world!</h1>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</body>
</html>`;
          
setSelectedHtml(bootstrapHtml);
}, []);




  return (
    <div className="flex">
      <div
        style={{
          margin: '0',
          padding: '0',
          display: 'flex',
        }}
      >
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md-2">
              <div
                className="sidebar mt-5"
                style={{
                  width: '14rem',
                  height: 'calc(100vh - 52px)',
                  backgroundColor: 'rgb(248,249,250)',
                  border: '1px solid #ccc',
                }}
              >
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <div className="nav-button">
                      <button
                        className="nav-link text-dark text-center fs-5 fw-semibold mt-5 ms-3"
                        onClick={toggleMenu}
                      >
                        Etiquetas HTML
                      </button>
                      {isMenuOpen && (
                        <ul className="sub-menu text-success ms-3 ">
                      {data.length > 0 ? (
                            data.map((item) => (
                              <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item.estructura_html)}
                                onDragEnd={handleDragEnd}
                                className="sub-menu-item text-dark"
                              >
                                {item.nombre}
                              </li>
                            ))
                          ) : (
                            <li className="sub-menu-item text-dark">No se encontraron etiquetas</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
  
            {/* Contenido principal */}
            <div className="col-md-10 mt-1">

              <div className="card ms-2 mb-2">
              <div class="card-header fw-bold">
              <i className="fa fa-file me-1 ms-1"></i>

                Creación de Pagina
                            
              </div>
                <div className="card-body">

                  <form>

                  <div className="row">
                    {/* Primera columna */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="mb-1" htmlFor="title">Título:</label>
                        <input type="text" className="form-control" name="title" required/>
                      </div>

                      <div className="mb-3 mt-4">
                        <label className="mb-1" htmlFor="HTMLContent">Contenido HTML:</label>
                        <textarea
                                placeholder="Arrastra y suelta etiquetas aquí para posicionarlas o editarlas"
                                value={selectedHtml}
                                onChange={handleTextAreaChange}
                                rows={16}
                                cols={100}
                                style={{ resize: 'none', spellCheck: 'false' }}
                                className="form-control"
                                name="HTMLContent"
                                required
                              ></textarea>
                      </div>

                    </div>

                    
                    <div className="col-md-6">

                      <div className="mb-3">
                        <label className="mb-1" htmlFor="url">URL:</label>
                        <input type="text" className="form-control" name="url" required/>
                      </div>

                      <div className="mb-3 mt-4">
                        <label className="mb-1">Resultado:</label>
                        <iframe
                                title="Vista previa del sitio web"
                                srcDoc={previewHtml}
                                style={{ width: '100%', height: '400px', border: '1px solid #ccc', borderRadius: '5px' }}
                              ></iframe>
                      </div>

                      
                    </div>
                  </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-1">
                  <button class="btn btn-primary me-md-2" type="submit">Crear pagina</button>
                  <button class="btn btn-danger" type="button">Borrar contenido html</button>
                </div>
         
                  </form>

                </div>
                <div class="card-footer text-body-secondary">
                  
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export default Paginascreate;
