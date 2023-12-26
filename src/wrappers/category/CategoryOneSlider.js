import PropTypes from "prop-types";
import clsx from "clsx"
import categoryData from "../../data/category/category-one.json";
import CategoryOneSingle from "../../components/category/CategoryOneSingle.js";
import { Container, Row } from "react-bootstrap";

// swiper slider settings

const CategoryOneSlider = ({ spaceBottomClass }) => {
  return (
    <div
      className={clsx("collections-area", spaceBottomClass)}
    >
      <Container>
        <Row className="collection-wrap-2 d-flex flex-wrap">


          {categoryData.map((single) => (
            <CategoryOneSingle
              data={single}
            />

          ))}

        </Row>

      </Container>

    </div>
  );
};

CategoryOneSlider.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default CategoryOneSlider;
