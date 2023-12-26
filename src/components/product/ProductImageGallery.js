import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { Container } from "react-bootstrap";




const ProductImageGallery = ({ product, realproduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const slides = product?.image.map((img, i) => ({
    src: process.env.PUBLIC_URL + img,
    key: i,
  }));
  console.log("slide")

 // swiper slider settings
  const gallerySwiperParams = {
    
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  
    modules: [EffectFade, Thumbs],
   
  };

  const thumbnailSwiperParams = {
  
    spaceBetween: 10,
    slidesPerView: 1,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    
    navigation: true,
  };

  const[activeThumb,setActiveThumb] =useState()



  return (
    <Fragment>
       {/* <div className="product-large-image-wrapper">  */}

      {/* {realproduct?.image?.length ? (
          <Swiper options={gallerySwiperParams}>
            {realproduct?.image.map((single, key) => (
              <SwiperSlide key={key}>
                <button className="lightgallery-button" onClick={() => setIndex(key)}>
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="single-image">
                  <img
                    src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${single}`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
            <AnotherLightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
              plugins={[Thumbnails, Zoom, Fullscreen]}
            />
          </Swiper>
        ) : null} */}

       {/* </div>  */}
   
      {/* <div classNme="product-small-image-wrapper shoppage">
        {realproduct?.image?.length ? (
          <Swiper options={thumbnailSwiperParams}  thumbs={{ swiper: thumbsSwiper }}>
            {realproduct?.image.map((single, key) => (
              <SwiperSlide key={key}>
                <div className="single-image text-center">
                  <img
                    src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${single}`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>

 
      {realproduct?.image?.length ? (
         <Swiper  options={gallerySwiperParams}   onSwiper={setThumbsSwiper}   >
        <div
          style={{
            marginTop: 20,
            display: "flex",
            overflow: "auto",
         }}
        >
          {realproduct?.image.map((single, key) => {
            return (
              <SwiperSlide key={key}>
              <img
                src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${single}`}
                style={{ width: 100, height: 100, marginLeft: 10 }}
            
              />
              </SwiperSlide>
            );
          })}
        </div>
         </Swiper>
      ) : null} */}
    
       <div className="product-small-image-wrapper shoppage">
        {realproduct?.image?.length ? (
          <Swiper options={thumbnailSwiperParams}>
            {realproduct?.image.map((single, key) => (
              <SwiperSlide key={key}>
                <div className="single-image text-center">
                  <img
                    src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${single}`}
                    className="img-fluid"
                    alt=""

                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
        </div>
    </Fragment>
  );
};

export default ProductImageGallery;
