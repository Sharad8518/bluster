import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} style={{ width: "200px", marginTop: "-40px" }} />
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()}{" "}. All Rights Reserved
        <br />Developed by<br />
        <a href="https://softseekersinfotech.com/" rel="noopener noreferrer" target="_blank">Softseekers Infotech Pvt. Ltd.</a>
        <br />This website is managed<br />
        <a href="#" rel="noopener noreferrer" target="_blank">Adiyogi Enterprises</a>
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
