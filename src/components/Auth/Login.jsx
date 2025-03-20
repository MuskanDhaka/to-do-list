import { toast } from "sonner";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye } from "react-icons/fa";
import { emailRegX, passwordRegX } from "../../utils/constants";
import { fetchLoginData } from "../../api/authService";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { emailValue, passwordValue } = formData;

    if (!emailRegX.test(emailValue)) {
      toast.warning("Invalid email format");
      return false;
    }
    if (passwordValue.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (!passwordRegX.test(passwordValue)) {
      toast.warning(
        "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters"
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoadingLogin(true);
    try {
      await fetchLoginData({
        emailValue: formData.emailValue,
        passwordValue: formData.passwordValue,
        navigate,
      });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return (
    <div className="container">
      <div className="picture">
        <img src="/background.jpeg" alt="background" />
      </div>
      <div className="login-wrapper">
        <h1 className="login-heading">Login</h1>
        <p className="create-account">
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>

        <div className="input-field">
          <input
            type="text"
            name="emailValue"
            placeholder="Email"
            value={formData.emailValue}
            onChange={handleInputChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type={passwordVisible ? "text" : "password"}
            name="passwordValue"
            placeholder="Password"
            value={formData.passwordValue}
            onChange={handleInputChange}
            required
          />
          <FaEye
            className="icon"
            onClick={() => setPasswordVisible((prev) => !prev)}
          />
        </div>

        <p className="forget-password">
          Forgot your password? <a href="/forgotpassword">Reset Password</a>
        </p>

        <button type="button" disabled={isLoadingLogin} onClick={handleLogin}>
          {isLoadingLogin ? "Logging in..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
