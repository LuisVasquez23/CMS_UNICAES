import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ title, path }) => {
  return (
    <>
      <li className="nav-item">
        <Link to={path} className="nav-link">
          {title}
        </Link>
      </li>
    </>
  );
};

NavItem.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
};

export default NavItem;
