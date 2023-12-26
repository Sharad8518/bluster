import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";


const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu
}) => {
  return (
    <footer className={clsx("footer-area", backgroundColorClass, spaceTopClass, spaceBottomClass, extraFooterClass, spaceLeftClass, spaceRightClass)}>
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-4"
              }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/logo.png"
              spaceBottomClass="mb-30"
            />
          </div>
          <div
            className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6"
              }`}

          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30"
                : "footer-widget mb-30 "
                }`}
            >
              <div className="footer-title">
                <h3>CONTACT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    Email :
                    <a
                      href="mailto:Bluster.india@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}Bluster.india@gmail.com
                    </a>
                  </li>
                  <li>
                    Phone :
                    <a
                      href="tel:+917223934647"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}+917223934647
                    </a>
                  </li>
                  <li>
                    Address :
                    <a
                      href="/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}Near David Guitar Classes, Christian Colony, Tehsili, Sagar
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4  custom-w_about" : "col-lg-2 col-sm-4"
              }`}

          >
            <div className="footer-widget mb-30">
              <div className="footer-title">
                <h3>ABOUT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/about"}>About us</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/contact"}>
                      Contact
                    </Link>
                  </li>
                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>
                      Orders tracking
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30"
                : "footer-widget mb-30 "
                }`}
            >
              <div className="footer-title">
                <h3>USEFUL LINKS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/refund-policy"}>Refund Policy</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/privacy-policy"}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/term-of-service"}>
                      Terms of service
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/shipping-policy"}>
                      Shipping Policy
                    </Link>
                  </li>

                  {/* <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>FAQs</Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-6"
              }`}
          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30 ml-145"
                : "footer-widget mb-30 ml-75"
                }`}
            >
              <div className="footer-title">
                <h3>FOLLOW US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="//www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="//www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterOne;
