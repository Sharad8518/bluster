import { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { CartContext } from "../../Context/cartcontext";

const Cart = () => {
  let cartTotalPrice = 0;
  let { pathname } = useLocation();
  const { cartData, removeItem, incQuantity, decQuantity } = useContext(CartContext);

  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartData && cartData.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>

                          {cartData.map((cartItem, key) => {

                            cartTotalPrice += parseInt(cartItem?.price) * parseInt(cartItem?.quantity);

                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.productId
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${cartItem.image}`}
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.productId
                                    }
                                  >
                                    {cartItem.productName}
                                  </Link>
                                  {cartItem.selectedProductColor &&
                                    cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">

                                  Rs. {cartItem?.price}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">

                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decQuantity(cartItem.id)
                                      }
                                    >
                                      -
                                    </button>


                                    <input
                                      className="cart-plus-minus-box"
                                      type="number"

                                      value={parseInt(cartItem?.quantity)}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        incQuantity(cartItem.id)
                                      }

                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  Rs. {cartItem?.price * cartItem?.quantity}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      removeItem(cartItem)
                                      // dispatch(deleteFromCart(cartItem.cartItemId))
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() =>
                          emptyCart()
                        }>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}



                <div className="col-lg-4 col-md-12" style={{ marginTop: 30, marginBottom:200 }}>
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                    </div>
                    <h5>
                      Total products{" "}
                      <span>
                        Rs. {cartTotalPrice}
                      </span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total{" "}
                      <span>
                        Rs. {cartTotalPrice}
                      </span>
                    </h4>
                    <div className="mainBottomDiv">
                      <div className="pro-details-quality ">
                        <Link style={{ fontSize: 15 }} to={process.env.PUBLIC_URL + "/checkout"}>
                          Proceed to Checkout with COD (Total: Rs {cartTotalPrice})
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
