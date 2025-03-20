import { Link,useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
        window.history.replaceState(null,"",location.href);
    }
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
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
        <button onClick = {handleLogout} style={{
                marginLeft: "20px",
                padding: "8px ",
                backgroundColor: "purple",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginRight:"20px",
                cursor: "pointer"}}>Logout</button>
      </ul>

    </div>
  );
};
export default Header;
