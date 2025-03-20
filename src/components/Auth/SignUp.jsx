import { toast } from "sonner";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchSignupData } from "../../api/authService";
import { emailRegX, passwordRegX } from "@utils/constants";
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function validateForm() {
    if (formData.firstName.length === 0) {
      setErrors("First Name cannot be empty");
      return false;
    } else if (!emailRegX.test(formData.emailId)) {
      setErrors("Invalid Email Address");
      return false;
    } else if (!passwordRegX.test(formData.password)) {
      setErrors(
        "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters"
      );
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match");
      return false;
    } else {
      setErrors("");
      toast.success("signup successful");
      return true;
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Signup successful");
      setIsLoadingSignUp(true);
      navigate("/");
      fetchSignupData(
        formData.firstName,
        formData.lastName,
        formData.emailId,
        formData.password
      );
    } else {
      toast.error("Failed to signup");
    }
  };
  return (
    <div className="container">
      <div className="picture">
        <img src="/background.jpeg" alt="background" />
      </div>
      <div className="signUp-wrapper">
        <div className="heading">
          <h1>Create an account</h1>
        </div>
        <div className="already-account">
          Already have an account? <a href="/">Log in</a>
        </div>
        <div className=" input-field-name">
          <div>
            <input
              type="text"
              placeholder="Firstname"
              className="name"
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                validateForm();
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Lastname"
              className="name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                validateForm();
              }}
            />
          </div>
        </div>
        <div className=" input-field">
          <input
            type="text"
            placeholder="Email"
            required
            value={formData.emailId}
            onChange={(e) => {
              setFormData({ ...formData, emailId: e.target.value });
              validateForm();
            }}
          />
        </div>
        <div className=" input-field">
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              validateForm();
            }}
          />
        </div>
        <div className=" input-field">
          <input
            type={passwordType}
            placeholder=" Confirm password"
            required
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              validateForm();
            }}
          />
          <FaEye
            className="icon"
            onClick={() => {
              setPasswordVisible(!passwordVisible),
                setPasswordType(passwordVisible ? "password" : "text");
            }}
          ></FaEye>
        </div>
        {errors && <div className="error">{errors}</div>}
        <button
          type="button"
          disabled={isLoadingSignUp}
          onClick={() => {
            handleSubmit();
            console.log("Clicked onSubmit");
          }}
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
