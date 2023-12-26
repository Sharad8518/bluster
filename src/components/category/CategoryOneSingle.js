import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const CategoryOneSingle = ({ data }) => {
  const navigate = useNavigate()

  const handleMobileClick = () => {

    navigate(`${process.env.PUBLIC_URL + data.link}`, {
      state: {
        category: data.category
      }
    })
  }
  return (
    <div className="collection-product-2">
      <div onClick={() => { handleMobileClick() }}>

        <Link  >
          <img src={process.env.PUBLIC_URL + data.image} alt="" />
        </Link>
        <div className="collection-content-2 text-center">
          {/* <span>{data.subtitle}</span> */}
          <h4>
            <Link>{data.title}</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

CategoryOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default CategoryOneSingle;
