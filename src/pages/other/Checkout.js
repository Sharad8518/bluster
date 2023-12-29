import { Fragment, useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useRoutes,redirect,  } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';
import uniqid from 'uniqid';
import AWS from 'aws-sdk';
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { MUTATION_CREATE_ORDER } from '../../graphql/Mutations';
import { QUERY_GET_All_ORDERS } from '../../graphql/Query'
import { CartContext } from "../../Context/cartcontext";
import { Form, Col, Row, Button, Spinner } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import {Buffer} from 'buffer';
import '../../ComponentsCss/CheckoutPage.css'
import sha256 from "sha256";
import axios from "axios";


let stateArray = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];

const Checkout = () => {
   



  let cartTotalPrice = 0;
  const userId = localStorage.getItem('userId')
  const { cartData, emptyCart } = useContext(CartContext);
  const [fnameState, setFnameState] = useState('')
  const [lnameState, setLnameState] = useState('')
  const [emailState, setEmailState] = useState('')
  const [contactState, setContactState] = useState('')
  const [stateState, setStateState] = useState('')
  const [cityState, setCityState] = useState('')
  const [addressState, setAddressState] = useState('')
  const [pincodeState, setPincodeState] = useState('')
  const [alternativeMobState, setAlternativeMobState] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [addressTwo, setAddressTwo] = useState('');

  const [allProducts, setAllProducts] = useState([])
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormValidity = () => {
    const formElement = document.getElementById('checkoutForm');
    if (formElement) {
      setIsFormValid(formElement.checkValidity());
    }
  };

  useEffect(() => { handleFormValidity(); }, [
    fnameState,
    lnameState,
    emailState,
    contactState,
    alternativeMobState,
    addressState,
    cityState,
    stateState,
    pincodeState
  ]);

  useEffect(() => {
    for (let x of cartData) {
      // console.log(x);
      setAllProducts(prevProduct => [...prevProduct, {
        "productId": x.productId,
        "productName": x.productName,
        "productMRP": x.price,
        "productSellPrice": null,
        "productImage": x.image,
        "quantity": parseInt(x.quantity),
        "category": x.category,
      }])
    }
  }, [cartData])

  const [createOrder, { loading: createOrderLoading }] = useMutation(MUTATION_CREATE_ORDER
    , {
      refetchQueries: [
        QUERY_GET_All_ORDERS
      ]
    }
  )
  const navigate = useNavigate();

  console.log("selectedPaymentMethod",selectedPaymentMethod)

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);

    
  };

  let { pathname } = useLocation();

  const [validated, setValidated] = useState(false);

  const transactionId ="T-bluster-"+uuidv4().toString(36).slice(-6)

  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setValidated(false);
      event.preventDefault();
     if(selectedPaymentMethod === "") {
      swal("Oops!", "Choose Payment Type", "error")

     }else{
      if(selectedPaymentMethod === "online"){
        setValidated(false);
        event.preventDefault();
          const payload ={
            merchantId: "PGTESTPAYUAT",
            merchantTransactionId: "MT7850590068188104",
            merchantUserId: "MUID123",
            amount: 10000,
            redirectMode:"POST",
            callbackUrl: "https://webhook.site/callback-url",
            mobileNumber: "9999999999",
          
            paymentInstrument: {
              type: "PAY_PAGE"
            }
        }
        const dataPayload = JSON.stringify(payload);
        console.log(dataPayload);
  
        const dataBase64 = Buffer.from(dataPayload).toString('base64');
        console.log(dataBase64)
  
        const fullURL = dataBase64 +"/pg/v1/pay" +"099eb0cd-02cf-4e2a-8aca-3e6c6aff0399" ;
        const dataSha256 =sha256(fullURL);
  
        const checksum = dataSha256 + "###" + 1
  
        console.log("checksum",checksum)
         const UAT_PAY_API_URI ="https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const response = await axios.post(
        UAT_PAY_API_URI,
        {
          request:dataBase64,
        },
        {
              headers:{
                accept:"application/json",
                "Content-Type": "application/json",
                "X-VERIFY":checksum,
              }
  
        }
        )
         const redirect = response.data.data.instrumentResponse.redirectInfo.url;
         window.location.href=redirect;

         localStorage.setItem("PaymentDetail",response)
         localStorage.setItem('Name', 'Rahul');
        createOrder({
          variables: {
            "orderInput": {
              // "userId": userId,
              "productDetails": allProducts,
               "paymentId": `${transactionId}`,
               "paymentMethod": `${selectedPaymentMethod}`,
              "fName": `${fnameState}`,
              "lName": `${lnameState}`,
              "contact": `${contactState}`,
              "alternateContactNo": `${alternativeMobState}`,
              "email": `${emailState}`,
              "address": `${addressState}`,
              "addressTwo": `${addressTwo}`,
              "state": `${stateState}`,
              "city": `${cityState}`,
              "pincode": `${pincodeState}`
            }
          }
        }).then((data) => {
          swal({
            title: "Success",
            text: "Product Successfully Placed",
            icon: "success",
          })
          navigate('/thankyou', { state: data });
          emptyCart(cartData);
  
        }).catch((e) => {
          swal("Oops!", "Seems like we couldn't fetch the info", "error"
          );
        })
      }else{
          createOrder({
        variables: {
          "orderInput": {
            // "userId": userId,
            "productDetails": allProducts,
            // "paymentId": null,
             "paymentMethod": `${selectedPaymentMethod}`,
            "fName": `${fnameState}`,
            "lName": `${lnameState}`,
            "contact": `${contactState}`,
            "alternateContactNo": `${alternativeMobState}`,
            "email": `${emailState}`,
            "address": `${addressState}`,
            "addressTwo": `${addressTwo}`,
            "state": `${stateState}`,
            "city": `${cityState}`,
            "pincode": `${pincodeState}`
          }
        }
      }).then((data) => {
        swal({
          title: "Success",
          text: "Product Successfully Placed",
          icon: "success",
        })
        navigate('/thankyou', { state: data });
        emptyCart(cartData);

      }).catch((e) => {
        swal("Oops!", "Seems like we couldn't fetch the info", "error"
        );
      })

      }
      
    }
  }
  };



  const[payamount,setPayAmount] =useState(1)
  
//online pay
  const handelPayment =async()=>{
      const transactionId ="T-bluster-"+uuidv4().toString(36).slice(-6);
      const payload ={
        merchantId: "M22N7N4TBLWA4",
        merchantTransactionId:transactionId,
        merchantUserId: contactState,
        amount:payamount*100,
        redirectMode:"POST",
        callbackUrl: "https://webhook.site/callback-url",
        mobileNumber: contactState,
        paymentInstrument: {
          type: "PAY_PAGE"
        }
    }
    const dataPayload = JSON.stringify(payload);
    console.log(dataPayload);

    const dataBase64 = Buffer.from(dataPayload).toString('base64');
    console.log(dataBase64)

    const fullURL = dataBase64 +"/pg/v1/pay" +"302e79fb-8df7-4b77-92ed-58ef2d5df6e2" ;
    const dataSha256 =sha256(fullURL);

    const checksum = dataSha256 + "###" + 1

    console.log("checksum",checksum)
     const UAT_PAY_API_URI ="https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const response = await axios.post(
    UAT_PAY_API_URI,
    {
      request:dataBase64,
    },
    {
          headers:{
            accept:"application/json",
            "Content-Type": "application/json",
            "X-VERIFY":checksum,
          },
    }
    )
     const redirect = response.data.data.instrumentResponse.redirectInfo.url;
     window.location.href=redirect;
  

  }



//cash on delivery
   const handelCOD =()=>{
    createOrder({
      variables: {
        "orderInput": {
          // "userId": userId,
          "productDetails": allProducts,
           "paymentId": `${transactionId}`,
           "paymentMethod": "Cash on Delivery",
          "fName": `${fnameState}`,
          "lName": `${lnameState}`,
          "contact": `${contactState}`,
          "alternateContactNo": `${alternativeMobState}`,
          "email": `${emailState}`,
          "address": `${addressState}`,
          "addressTwo": `${addressTwo}`,
          "state": `${stateState}`,
          "city": `${cityState}`,
          "pincode": `${pincodeState}`
        }
      }
    }).then((data) => {
      swal({
        title: "Success",
        text: "Product Successfully Placed",
        icon: "success",
      })
      navigate('/thankyou', { state: data });
      emptyCart(cartData);

    }).catch((e) => {
      swal("Oops!", "Seems like we couldn't fetch the info", "error"
      );
    })
   }

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {
              cartData && cartData.length >= 0 ? (
                <div className="row">
                  <div className="col-lg-7">

                    {/* <form id="checkoutForm">
                      <div className="billing-info-wrap">
                        <h3>Billing Details</h3>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>First Name</label>
                              <input type="text"
                                onChange={(e) => setFnameState(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Last Name</label>
                              <input type="text" onChange={(e) => setLnameState(e.target.value)} required />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Phone</label>
                              <input type="text" onChange={(e) => setContactState(e.target.value)} required />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Email Address</label>
                              <input type="text" onChange={(e) => setEmailState(e.target.value)} required />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Alternate Phone No</label>
                              <input type="text" onChange={(e) => setAlternativeMobState(e.target.value)} required />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Address</label>
                              <input
                                className="billing-address"
                                placeholder="House number and street name"
                                type="text-area"
                                onChange={(e) => setAddressState(e.target.value)} required
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Town / City</label>
                              <input type="text"
                                onChange={(e) => setCityState(e.target.value)} required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>State / County</label>
                              <input type="text"
                                onChange={(e) => setStateState(e.target.value)} required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Postcode / ZIP</label>
                              <input type="text"
                                onChange={(e) => setPincodeState(e.target.value)} required />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form> */}









                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                          <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="First Name"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onChange={(e) => setFnameState(e.target.value)}
                              value={fnameState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter First Name</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Last Name"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onChange={(e) => setLnameState(e.target.value)}
                              value={lnameState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter Last Name</Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Phone No <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              type="number"
                              placeholder="Phone No"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onWheel={(e) => e.target.blur()}
                              onChange={(e) => setContactState(e.target.value)}
                              value={contactState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter Phone No</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Alternate Phone No </Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Alternate Phone No"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onWheel={(e) => e.target.blur()}
                              onChange={(e) => setAlternativeMobState(e.target.value)}
                              value={alternativeMobState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter Alternate Phone No</Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              type="email"
                              placeholder="Email"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onChange={(e) => setEmailState(e.target.value)}
                              value={emailState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter Email</Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Pincode <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              type="number"
                              placeholder="Pincode"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onWheel={(e) => e.target.blur()}
                              onChange={(e) => setPincodeState(e.target.value)}
                              value={pincodeState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter Pincode</Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>State <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              as="select"
                              className="formControl"
                              style={{ fontSize: 12, borderRadius: 0, height: 45 }}
                              onChange={(e) => setStateState(e.target.value)}
                              value={stateState}
                            >
                              <option value="" selected="selected" disabled="disabled">Choose State</option>
                              {
                                stateArray.map(stateData =>
                                  <option value={stateData}>{stateData}</option>
                                )
                              }
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Choose State</Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>City <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="City"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onChange={(e) => setCityState(e.target.value)}
                              value={cityState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter City</Form.Control.Feedback>
                          </Form.Group>

                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>House No., Building Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              as="textarea"
                              placeholder="House No., Building Name"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onWheel={(e) => e.target.blur()}
                              onChange={(e) => setAddressState(e.target.value)}
                              value={addressState}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter House No., Building Name</Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Road Name, Area, Colony <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              required
                              as="textarea"
                              placeholder="Road Name, Area, Colony"
                              style={{ fontSize: 12, borderRadius: 0 }}
                              onWheel={(e) => e.target.blur()}
                              onChange={(e) => setAddressTwo(e.target.value)}
                              value={addressTwo}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter Road Name, Area, Colony</Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        {/* {
                          createOrderLoading ?
                            <Spinner animation="border" role="status" className="mx-auto d-block">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                            <div className="placeOrderBottomDiv">
                              <Button type="submit" className="placeorderbtn">Place Order</Button>
                            </div>
                        } */}
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartData.map((cartItem, key) => {
                                cartTotalPrice += parseInt(cartItem?.price * cartItem?.quantity);

                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.productName} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">Rs. {cartTotalPrice}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>Rs. {cartTotalPrice}</li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method">
                          <h3>Payment Method</h3>
                          <p style={{color:"#777",fontStyle:"italic"}}>Please Choose Payment Method</p>
                          <div className="payment-method-list">
                            <div className="single-method">
                              <input
                                className="d-block w-25"
                                type="radio"
                                name="paymentMethod"
                                // checked={selectedPaymentMethod === "cash"}
                               
                                onChange={() => setSelectedPaymentMethod("online")}
                                style={{width:30,height:30}}
                              />
                              <label htmlFor="payment-cash" className="w-75">Pay with Online</label>
                            </div>

                            <div className="single-method" style={{marginTop:5}}>
                              <input
                                className="d-block w-25"
                                type="radio"
                                name="paymentMethod"
                                // checked={selectedPaymentMethod === "cash"}
                              
                                onChange={() => setSelectedPaymentMethod("cash")}
                                 style={{width:30,height:30}}
                              />
                              <label htmlFor="payment-cash" className="w-75">Cash on Delivery</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="place-order mt-25">
                      { fnameState === '' || lnameState ==='' || emailState==='' ||contactState ==='' ||stateState ==='' || cityState== '' || addressState ==='' || pincodeState ==='' ||alternativeMobState==='' ||selectedPaymentMethod ==='' ||addressTwo ===''?
                        <Button className="btn-hover"
                         disabled
                        
                        >Place Order</Button>
                      :
                      selectedPaymentMethod === "online"?
                        <button className="btn-hover"
                         
                        // disabled={!isFormValid}
                        onClick={()=>handelPayment()}>Place Order</button>
                      :
                      createOrderLoading ?
                      <Spinner animation="border" role="status" className="mx-auto d-block">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                      :
                     <button className="btn-hover"
                     onClick={()=>handelCOD()}
                        // disabled={!isFormValid}
                        >Place Order</button>
                      }



<button className="btn-hover"
                     onClick={()=>handelPayment()}
                        // disabled={!isFormValid}
                        >Place Order</button>
                     
                      </div>
                    </div>
                  </div>
                </div>

              ) : (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-cash"></i>
                      </div>
                      <div className="item-empty-area__text">
                        No items found in cart to checkout <br />{" "}
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
      </LayoutOne >
    </Fragment >
  );
};

export default Checkout;
