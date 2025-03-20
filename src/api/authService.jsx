import { toast } from "sonner";
import axiosInstance from "./apiClient";
export const fetchLoginData = async ({
  emailValue,
  passwordValue,
  navigate,
}) => {
  try {
    const response = await axiosInstance.post("http://192.168.1.4:3000/login", {
      emailId: emailValue,
      password: passwordValue,
    });
    if (response.data.success) {
      window.localStorage.setItem(
        "accessToken",
        response.data.data.accessToken
      );
      window.localStorage.setItem(
        "refreshToken",
        response.data.data.refreshToken
      );

      navigate(`/home`);
    } else {
      toast("Invalid email or password");
    }
  } catch (error) {
    console.log("Error in login : ", error);

    toast("Something went wrong. Please try again later.");
  }
};

export const fetchSignupData = async ({
  firstName,
  lastName,
  emailId,
  password,
}) => {
  try {
    const response = await axiosInstance.post(
      "http://192.168.1.45:3000/signup",
      {
        firstName,
        lastName,
        emailId,
        password,
      }
    );
  } catch (error) {
    console.log("Error in SignUp : ", error);
    toast("Signup failed. Please try again.");
  }
};
