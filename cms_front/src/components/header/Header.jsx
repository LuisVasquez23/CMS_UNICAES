import NavItem from "../navitem/NavItem";
import Logout from "../logout/Logout";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            CMS UNICAES
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <NavItem title="Inicio" path="/dashboard" />
              <NavItem title="Paginas" path="/dashboard/paginas" />
              <Logout />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
