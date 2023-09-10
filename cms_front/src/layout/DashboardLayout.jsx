import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{{ children }}</main>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default DashboardLayout;
