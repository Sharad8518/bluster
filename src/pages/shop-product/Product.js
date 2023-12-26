import React, { Fragment, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useQuery } from '@apollo/client'
import { QUERY_GET_PRODUCT_BY_ID } from '../../graphql/Query'
import { FaStar,FaCheckCircle,FaThumbsUp,FaThumbsDown } from "react-icons/fa";
import { Container,Row,Col,Image } from "react-bootstrap";


const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(product => product.id === id);
  // const { data: buyOrderData } = useQuery(QUERY_GET_PRODUCT_BY_ID);
  // const realproduct = buyOrderData?.getAllProducts?.find(product => product.id == id);
  const { data: getProductById, loading: productLoading } = useQuery(QUERY_GET_PRODUCT_BY_ID,
    {
      variables:
      {
        "id": `${id}`

      }
    });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // console.log("dshfkds", getProductById);
  return (
    <Fragment>
      {window.scrollTo(0, 0)}
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      {/* <LayoutOne headerTop="visible"> */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        {/* product description with image */}
        <Suspense fallback={
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        }>


          <ProductImageDescription
            spaceTopClass="pt-50"
            spaceBottomClass="pb-50"
            product={product}
            realproduct={getProductById?.getProductById[0]}
            galleryType="leftThumb"
          />

           <Container style={{marginBottom:20}}>
            <h4 style={{fontWeight:"bold"}}>All Reviews</h4>
            <hr></hr>
            {/* one review start */}
            <Row style={{marginTop:10}}>
              <Col md={12}>
               <div style={{display:"flex"}}>
                <div style={{background:"#2ecc71",width:50,height:20,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:5}}> <span style={{marginTop:3,color:"#fff"}}>5</span> <span style={{marginLeft:5,fontSize:12,marginTop:1,color:"#fff"}}><FaStar/></span></div>
                 <h6 style={{marginLeft:10,marginTop:3,fontWeight:"bold"}}>Awesome</h6>

               </div>
               <p>I don't know why but as i keep my phone in pocket the voice and music starts breaking... please let me know what to do</p>
               <Image src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41CdO-LOtRL._AC_.jpg"  style={{width:70,height:70,marginBottom:10}}/>
               <Row>
                <Col>
                <div style={{display:"flex"}}> 
                <h6 style={{fontWeight:"bold",color:"#777"}}>roshan tiwari</h6>
                  <h6 style={{marginLeft:5}}>2 Mar, 2023</h6>
                </div>
                <h6 style={{color:"#777"}}><FaCheckCircle/> Certifed Buyer</h6>
                </Col>
                <Col>
                  <div style={{display:"flex",justifyContent:"end",cursor:"pointer"}}>
                    <div style={{display:"flex"}}>
                      <div style={{display:"flex"}}>
                       <FaThumbsUp color="#777"/>
                       <h6 style={{marginLeft:5,color:"#777",marginTop:2,fontWeight:"bold"}}>125</h6>
                      </div>
                      <div style={{display:"flex",marginLeft:10,marginTop:2,cursor:"pointer"}}>
                      <FaThumbsDown color="#777"/>
                      <h6 style={{marginLeft:5,color:"#777",fontWeight:"bold"}}>0</h6>
                      </div>
                    </div>
                  </div>
                </Col>
               </Row>
              </Col>
            </Row>
             {/* one review end */}

                {/* one review start */}
            <Row style={{marginTop:10}}>
              <Col md={12}>
               <div style={{display:"flex"}}>
                <div style={{background:"#2ecc71",width:50,height:20,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:5}}> <span style={{marginTop:3,color:"#fff"}}>2</span> <span style={{marginLeft:5,fontSize:12,marginTop:1,color:"#fff"}}><FaStar/></span></div>
                 <h6 style={{marginLeft:10,marginTop:3,fontWeight:"bold"}}>Good</h6>

               </div>
               <p>I don't know why but as i keep my phone in pocket the voice and music starts breaking... please let me know what to do</p>
               <div style={{display:"flex"}}>
               <Image src="https://i5.walmartimages.com/seo/onn-Wireless-In-Ear-Bluetooth-Earphones-with-Active-Noise-Cancellation-Ambient-Sound-Lilac_b0849ef5-7fa7-4ebb-85ef-f9c73bbe2ee8.6cc9f51ecb6c823bb5b36e7fa2f6c930.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"  style={{width:70,height:70,marginBottom:10}}/>
               </div>
               <Row>
                <Col>
                <div style={{display:"flex"}}> 
                <h6 style={{fontWeight:"bold",color:"#777"}}>roshan tiwari</h6>
                  <h6 style={{marginLeft:5}}>2 Mar, 2023</h6>
                </div>
                <h6 style={{color:"#777"}}><FaCheckCircle/> Certifed Buyer</h6>
                </Col>
                <Col>
                  <div style={{display:"flex",justifyContent:"end",cursor:"pointer"}}>
                    <div style={{display:"flex"}}>
                      <div style={{display:"flex"}}>
                       <FaThumbsUp color="#777"/>
                       <h6 style={{marginLeft:5,color:"#777",marginTop:2,fontWeight:"bold"}}>125</h6>
                      </div>
                      <div style={{display:"flex",marginLeft:10,marginTop:2,cursor:"pointer"}}>
                      <FaThumbsDown color="#777"/>
                      <h6 style={{marginLeft:5,color:"#777",fontWeight:"bold"}}>0</h6>
                      </div>
                    </div>
                  </div>
                </Col>
               </Row>
              </Col>
            </Row>
             {/* one review end */}


                {/* one review start */}
            <Row style={{marginTop:10}}>
              <Col md={12}>
               <div style={{display:"flex"}}>
                <div style={{background:"#2ecc71",width:50,height:20,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:5}}> <span style={{marginTop:3,color:"#fff"}}>4.5</span> <span style={{marginLeft:5,fontSize:12,marginTop:1,color:"#fff"}}><FaStar/></span></div>
                 <h6 style={{marginLeft:10,marginTop:3,fontWeight:"bold"}}>Pretty good</h6>

               </div>
               <p>I don't know why but as i keep my phone in pocket the voice and music starts breaking... please let me know what to do</p>
               <div style={{display:"flex"}}>
               <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuP6YXGppOiV3gJzPqO3yM80pawRfDDZ0w1yPoE4lTEIr0fA4rqBc-jQfqUuA4wwm0bp4&usqp=CAU"  style={{width:70,height:70,marginBottom:10}}/>
               </div>
               <Row>
                <Col>
                <div style={{display:"flex"}}> 
                <h6 style={{fontWeight:"bold",color:"#777"}}>roshan tiwari</h6>
                  <h6 style={{marginLeft:5}}>2 Mar, 2023</h6>
                </div>
                <h6 style={{color:"#777"}}><FaCheckCircle/>  Certifed Buyer</h6>
                </Col>
                <Col>
                  <div style={{display:"flex",justifyContent:"end",cursor:"pointer"}}>
                    <div style={{display:"flex"}}>
                      <div style={{display:"flex"}}>
                       <FaThumbsUp color="#777"/>
                       <h6 style={{marginLeft:5,color:"#777",marginTop:2,fontWeight:"bold"}}>125</h6>
                      </div>
                      <div style={{display:"flex",marginLeft:10,marginTop:2,cursor:"pointer"}}>
                      <FaThumbsDown color="#777"/>
                      <h6 style={{marginLeft:5,color:"#777",fontWeight:"bold"}}>0</h6>
                      </div>
                    </div>
                  </div>
                </Col>
               </Row>
              </Col>
            </Row>
             {/* one review end */}


                {/* one review start */}
            <Row style={{marginTop:10}}>
              <Col md={12}>
               <div style={{display:"flex"}}>
                <div style={{background:"#2ecc71",width:50,height:20,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:5}}> <span style={{marginTop:3,color:"#fff"}}>3</span> <span style={{marginLeft:5,fontSize:12,marginTop:1,color:"#fff"}}><FaStar/></span></div>
                 <h6 style={{marginLeft:10,marginTop:3,fontWeight:"bold"}}>Nice</h6>

               </div>
               <p>I don't know why but as i keep my phone in pocket the voice and music starts breaking... please let me know what to do</p>
               <div style={{display:"flex"}}>
               <Image src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/41CdO-LOtRL._AC_.jpg"  style={{width:70,height:70,marginBottom:10}}/>
               </div>
               <Row>
                <Col>
                <div style={{display:"flex"}}> 
                <h6 style={{fontWeight:"bold",color:"#777"}}>roshan tiwari</h6>
                  <h6 style={{marginLeft:5}}>2 Mar, 2023</h6>
                </div>
                <h6 style={{color:"#777"}}><FaCheckCircle/> Certifed Buyer</h6>
                </Col>
                <Col>
                  <div style={{display:"flex",justifyContent:"end",cursor:"pointer"}}>
                    <div style={{display:"flex"}}>
                      <div style={{display:"flex"}}>
                       <FaThumbsUp color="#777"/>
                       <h6 style={{marginLeft:5,color:"#777",marginTop:2,fontWeight:"bold"}}>125</h6>
                      </div>
                      <div style={{display:"flex",marginLeft:10,marginTop:2,cursor:"pointer"}}>
                      <FaThumbsDown color="#777"/>
                      <h6 style={{marginLeft:5,color:"#777",fontWeight:"bold"}}>0</h6>
                      </div>
                    </div>
                  </div>
                </Col>
               </Row>
              </Col>
            </Row>
             {/* one review end */}
           </Container>

          {/* product description tab */}
          <ProductDescriptionTab
            spaceBottomClass="pb-90"
            productFullDesc={product?.fullDescription}
            realproduct={getProductById?.getProductById[0]}
          />
        </Suspense>
       
        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product?.category[0]}
        /> */}
      {/* </LayoutOne> */}
    </Fragment>
  );
};

export default Product;
