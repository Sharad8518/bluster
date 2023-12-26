import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";

import { CartContext } from "../../Context/cartcontext";
import { useContext } from "react";

const IconGroup = ({ iconWhiteClass }) => {
  const userId = localStorage.getItem('userId')
  const handleClick = e => {
    // navigate('/cart')
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const handlecartClick = e => {
    navigate('/cart')
  };

  const navigate = useNavigate();
  function userlogoutHandle() {
    navigate('/')
    localStorage.removeItem('userToken')
    localStorage.removeItem('userId')
    window.location.reload()
  }
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { cartData, wishlistData } = useContext(CartContext);

  console.log("wishlistData", wishlistData);
  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      {/* <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}
      {/* <div className="same-style account-setting d-lg-block">
        <button className="account-setting-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {userId ?
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    my account
                  </Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-order"}>
                    Orders
                  </Link>
                </li>
                <li onClick={() => userlogoutHandle()}>
                  <Link to='/'>
                    Logout
                  </Link>
                </li>
              </>
              :
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
              </li>
            }
          </ul>
        </div>
      </div> */}
      {/* <div className="same-style header-wishlist">
            <Link to={process.env.PUBLIC_URL + "/my-account"}>
              <i className="pe-7s-cart" />
            </Link>
          </div> */}
      {/* <div className="same-style header-wishlist">
            <Link to={process.env.PUBLIC_URL + "/wishlist"}>
              <i className="pe-7s-like" />
              <span className="count-style">
                {wishlistData?.length} </span>
            </Link>
          </div> */}

      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handlecartClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData?.length}
          </span>
        </button>
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData?.length}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>

    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
