import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <p>�� 2023 My App. All rights reserved.</p>

      <ul>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
      </ul>

      <div className="social-media">
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default Footer;
