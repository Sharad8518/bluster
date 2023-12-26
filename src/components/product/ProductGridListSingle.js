import PropTypes from "prop-types";
import { Fragment, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import { CartContext } from "../../Context/cartcontext";
import swal from 'sweetalert';



const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToWishlist } = useContext(CartContext);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId')

  const navigate = useNavigate();
  // console.log("wislist product", product);

  const handleclick = () => {
    navigate(`/product/${product.id}`, {
      state: {
        product: product
      }
    })
  }
  const handlewishlist = () => {
    if (userId) { addToWishlist(product) }
    else {
      swal("Please Login First", " ", "warning");
      navigate("/login-register")
    }
  }
  console.log("product", product)
  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)} >
        <div className="product-img" onClick={() => handleclick()} >
          <Link >
            <img className="default-img" src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${product?.image[0]}`} alt="" />
          </Link>
          <div className="product-action">
            {/* <div className="pro-same-action pro-wishlist">
              <button>
                <i className="pe-7s-like" onClick={() => handlewishlist()} />
              </button>
            </div> */}
            <div className="pro-same-action pro-cart " onClick={() => handleclick()}>
              <Link >
                View Details
              </Link>
            </div>
            {/* <div className="pro-same-action pro-quickview">
              <button onClick={() => handleclick()} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div> */}
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link >
              {product.productName}
            </Link>
          </h3>
          <div className="product-price">
            <span>Rs. {product.productSellPrice} </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductGridListSingle;
