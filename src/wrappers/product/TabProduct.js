import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";
import { useQuery } from '@apollo/client'
import { QUERY_All_Product } from '../../graphql/Query'
import ProductgridList from "./ProductgridList";
import ShopProducts from "./ShopProducts";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  category
}) => {

  const { data: allproductdata, loading: productProLoading } = useQuery(QUERY_All_Product);
  return (
    <div
      className={clsx("product-area", spaceTopClass, spaceBottomClass, bgColorClass)}
    >
      <div className="container">
        <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
        <div className="row">
          <ProductGrid
            products={allproductdata?.getAllProducts}
            spaceBottomClass="mb-25"
          />
          {/* <ShopProducts layout={"five-column"} products={allproductdata?.getAllProducts} /> */}
        </div>

      </div>
    </div>
  );
};

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TabProduct;
