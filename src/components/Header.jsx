import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
const Header = () => {
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      >
        <FaTasks
          style={{
            fontSize: "100px",
            marginLeft: "10px",
          }}
        />
        <h3
          style={{
            marginLeft: "100px",
          }}
        >
          To-Do-manager
        </h3>
      </div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
};
export default Header;
