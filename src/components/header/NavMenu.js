import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleMobileClick = (cat) => {

    navigate(`${process.env.PUBLIC_URL + "/shop-grid-standard"}`, {
      state: {
        category: cat
      }
    })
  }

  return (
    <div
      className={clsx(sidebarMenu
        ? "sidebar-menu"
        : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {t("Categories")}
            </Link>
            <ul className="submenu">
              <li onClick={() => handleMobileClick("Airpods")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("airpods")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Neckband")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Neckbands")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Earphone Headphone")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Earphones / Headphone")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Smart watch")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Smart Watch")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Trimmers")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Trimmers")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Powerbanks")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Powerbanks")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Speakers")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Speakers")}
                </Link>
              </li>
              <li onClick={() => handleMobileClick("Gadgets")}>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  {t("Gadget's")}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>
              {t("about_us")}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("contact_us")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
