import React, { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwo from "../../wrappers/hero-slider/HeroSliderTwo";
import CategoryOneSlider from "../../wrappers/category/CategoryOneSlider";
import TabProduct from "../../wrappers/product/TabProduct";
import FeatureIconThree from "../../wrappers/feature-icon/FeatureIconThree";
import BannerThree from "../../wrappers/banner/BannerThree";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import BlogFeaturedTwo from "../../wrappers/blog-featured/BlogFeaturedTwo";
import SectionTitle from "../../components/section-title/SectionTitle";
import FooterOne from "../../wrappers/footer/FooterOne";


const HomeElectronics = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Fragment>
      <SEO
        title={`Ecommerce SSI`}
        description={`Electron eCommerce By SSI`}
      />
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <HeroSliderTwo />
        {/* category slider */}
        <SectionTitle titleText="Top Categories" positionClass="text-center" />

        <CategoryOneSlider spaceBottomClass="pb-95" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />

        {/* banner */}
        <BannerThree spaceBottomClass="pb-100" />

        {/* feature icon */}
        <FeatureIconThree
          spaceBottomClass="pb-70"
          featureShapeClass="support-shape-3"
        />

        {/* blog featured */}
        {/* <BlogFeaturedTwo spaceBottomClass="pb-55" /> */}

        {/* brand logo slider */}
        <BrandLogoSliderOne spaceBottomClass="pb-95" spaceTopClass="pt-100" />
      </LayoutOne>
      {/* <FooterOne 
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      /> */}
    </Fragment>
  );
};

export default HomeElectronics;
