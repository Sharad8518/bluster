import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
// import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product, realproduct }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const wishlistItem = wishlistItems.find(item => item?.id === product?.id);
  const compareItem = compareItems.find(item => item?.id === product?.id);
  const discountedPrice = getDiscountPrice(product?.price, product?.discount);
  const finalProductPrice = +(product?.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  // console.log("yugyu", realproduct);
  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container ">
        <div className="row shoppage">
          <div className="col-lg-6 col-md-6">

            {/* <ProductImageGallerySideThumb
              product={realproduct}
              thumbPosition="left"
            /> */}
            <ProductImageGallery
              product={product}
              realproduct={realproduct} />
          </div>
          <div className="col-lg-6 col-md-6">
            <ProductDescriptionInfo
              product={product}
              realproduct={realproduct}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
            />
               
          </div>
       
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
