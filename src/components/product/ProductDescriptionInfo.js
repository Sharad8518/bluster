import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import '../../ComponentsCss/Addtocartbottom.css'

import { getProductCartQuantity } from "../../helpers/product";
// import { addToCart } from "../../store/slices/cart-slice";;
// import { addToCompare } from "../../store/slices/compare-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice"
import { CartContext } from "../../Context/cartcontext"
import swal from 'sweetalert';


const ProductDescriptionInfo = ({ realproduct, product, discountedPrice, currency, finalDiscountedPrice, finalProductPrice, cartItems, wishlistItem, compareItem }) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId')
  // console.log("uid", userId);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product?.variation ? product?.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product?.variation ? product?.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product?.variation ? product?.variation[0].size[0].stock : product?.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    realproduct,
    selectedProductColor,
    selectedProductSize
  );
  const navigate = useNavigate();
  const { addToCart, cartData, addToWishlist, wishlistData } = useContext(CartContext);
  // const handleAddToCart = () => {
  //   if (userId) {
  //     addToCart(realproduct);
  //   } else {
  //     swal("Please Login First", " ", "warning");
  //     navigate("/login-register");
  //   }
  // }

  const handleAddToCart = () => {
    addToCart(realproduct);
  }

  const handleProccedToCart = () => {
    navigate("/cart")
  }

  // const handleProccedToCart = () => {
  //   if (userId) {
  //     navigate("/cart")
  //   } else {
  //     swal("Please Login First", " ", "warning");
  //     navigate("/login-register");
  //   }
  // }
  const handlewishlist = () => {
    if (userId) { addToWishlist(realproduct) }
    else {
      swal("Please Login First", " ", "warning");
      navigate("/login-register")
    }
  }

  const handleBuyNow = async () => {
    await addToCart(realproduct);
    navigate("/cart");
  };

  // const handleBuyNow = async () => {
  //   if (userId) {
  //     await addToCart(realproduct);
  //     navigate("/cart");
  //   } else {
  //     swal("Please Login First", " ", "warning");
  //     navigate("/login-register");
  //   }
  // };

  return (
    <div className="product-details-content ml-70">
      <h2>{realproduct?.productName}</h2>
      <div className="product-details-price">
        <span className="text-dark fw-bold">Rs. {realproduct?.productSellPrice}</span>
      </div>
      <div style={{ marginTop: "-20px" }}>
        <span className="cancel-order text-secondary">MRP Rs. {realproduct?.productMRP}</span>
      </div>
      <div className="fw-bold text-danger justif" style={{ fontSize: "12px" }}>Discount : Rs {parseInt(realproduct?.productMRP) - parseInt(realproduct?.productSellPrice)}</div>
      <div className="pro-details-list">
        <p>{realproduct?.productDescription}</p>
      </div>

      <div className="mainBottomDiv">
        <div className="pro-details-quality ">
          <div className="pro-details-cart row justify-content-center btn-hover">
            {
              cartData.some(obj => obj.productId === realproduct?.id) === true ?
                <button onClick={() => handleProccedToCart()} style={{marginLeft:10}}>Proceed To Cart</button>
                :
                <button onClick={() => handleAddToCart()} style={{ marginLeft: 10 }}>Add To Cart</button>
            }

            {
              cartData.some(obj => obj.productId === realproduct?.id) === true ?
              <button onClick={() => handleProccedToCart()} style={{visibility:'hidden', width:'100%', marginLeft:50}}>Proceed To Cart</button>
                :
                <button onClick={() => handleBuyNow()} style={{ marginTop: 20, marginLeft: 10 }}>Order Now - Cash on Delivery</button>
            }


            {/* {
              wishlistData.some(obj => obj.productId === realproduct?.id) === true ?
                <span className="align-middle ">
                  <FaHeart className="ms-3 fs-3 fw-medium text-danger" />
                </span>
                :
                <span className="align-middle wishlistbtn" onClick={() => handlewishlist()}>
                  <i className="pe-7s-like ms-3 fs-3 fw-medium " />
                </span>
            } */}
          </div>
        </div>
      </div>


      <div className="pro-details-meta">
        <span>Categories :</span>
        <ul>
          {realproduct?.category}
        </ul>
      </div>



      <div className="pro-details-meta">
        <span>Tags :</span>
        <ul>
          {realproduct?.tag}
        </ul>
      </div>
    </div >
  );
};


export default ProductDescriptionInfo;
