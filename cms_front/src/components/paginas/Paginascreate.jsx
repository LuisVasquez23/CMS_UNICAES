import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./paginas.css";

const Paginascreate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [data, setData] = useState([]);
  const [etiquetaArrastrada, setEtiquetaArrastrada] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [contenidoHtml, setContenidoHtml] = useState("");

  useEffect(() => {
    // Realizamos una solicitud a la API
    fetch("http://127.0.0.1:8000/api/etiquetas")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Actualiza la vista previa cuando se cambia el contenido principal
    const bootstrapHtml = `<!doctype html>
                        <html lang="en">

                        <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>Bootstrap demo</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
                        </head>

                        <body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
                        ${contenidoHtml} <!-- Contenido HTML -->
                        </body>
                        </html>`;
    setPreviewHtml(bootstrapHtml);
  }, [contenidoHtml]);

  const handleDragStart = (e, estructuraHtml) => {
    e.dataTransfer.setData("text/plain", estructuraHtml);
    setEtiquetaArrastrada(estructuraHtml);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleTextAreaChange = (e) => {
    setContenidoHtml(e.target.value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (etiquetaArrastrada) {
      setContenidoHtml(contenidoHtml + etiquetaArrastrada);
      setEtiquetaArrastrada(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-2">
          <div className="sidebar">
            <ul className="nav flex-column">
              <li className="nav-item" id="nav-item">
                <div className="nav-button">
                  <button className="tag-header" onClick={toggleMenu}>
                    Etiquetas HTML <i className="fa fa-code fw-bold"></i>
                  </button>
                  {isMenuOpen && (
                    <ul className="sub-menu text-success ">
                      {data.length > 0 ? (
                        data.map((item) => (
                          <li
                            key={item.id}
                            draggable
                            onDragStart={(e) =>
                              handleDragStart(e, item.estructura_html)
                            }
                            onDragEnd={handleDragEnd}
                            className="text-dark"
                          >
                            {"<" + item.nombre + "/>"}
                          </li>
                        ))
                      ) : (
                        <li className="text-dark">
                          No se encontraron etiquetas
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-10 mt-1">
          <div className="card ms-2 mb-2">
            <div className="card-header fw-bold">
              <i className="fa fa-file"></i>
              Creación de Página
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="mb-1" htmlFor="title">
                        Título:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="mb-1" htmlFor="url">
                        URL:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="url"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="mb-3 mt-4"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <label className="mb-1" htmlFor="HTMLContent">
                        Contenido HTML:
                      </label>
                      <textarea
                        placeholder="Arrastra y suelta etiquetas aquí para posicionarlas o editarlas"
                        value={contenidoHtml}
                        onChange={handleTextAreaChange}
                        rows={16}
                        cols={100}
                        style={{ resize: "none", spellCheck: "false" }}
                        className="form-control"
                        name="HTMLContent"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 mt-4">
                      <label className="mb-1">Resultado:</label>
                      <iframe
                        title="Vista previa del sitio web"
                        srcDoc={previewHtml}
                        style={{
                          width: "100%",
                          height: "400px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paginascreate;
