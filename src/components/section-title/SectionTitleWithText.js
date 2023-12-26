import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Bluster</h1>
          <p>
            Born in 2021, in sagar city , worn in the world today. As Bluetooth audio and accessories pioneer we have consistently reinvented the definition of Bluetooth audio and accessories to keep up with the trends. We provide an iconic brand that is synonymously associated with fashion and limitless creativity. Bluster.in gives you the foundations to exude self-confidence, uniqueness and authenticity.
            enjoying support of a large clientele worldwide. Catering to the quintessentially stylish people of today who is, personality & trend conscious, the collection boasts of timeless classic additions that are a must feature in everyone’s daily routine.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
