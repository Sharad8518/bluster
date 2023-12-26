import React, { Fragment, useEffect } from "react";
import { useState } from 'react'

import { useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { MUTATION_SEND_USEROTP, MUTATION_USER_OTP_LOGIN } from "../../graphql/Mutations"
import { useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';

const LoginRegister = () => {
  const navigate = useNavigate();

  let { pathname } = useLocation();
  const [contact, setContact] = useState('')
  const [gotp, setOtp] = useState('')
  const [otpState, setOtpState] = useState('')
  const [userOtpLogin, { data: logindata, loading: loginLoading, error }] = useMutation(MUTATION_USER_OTP_LOGIN)

  const userToken = localStorage.getItem('userToken')

  const [validated, setValidated] = useState(false);
  const [validated2, setValidated2] = useState(false);
  const [sendOtp] = useMutation(MUTATION_SEND_USEROTP)
  const [otpSent, setOtpSent] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function handleClick(event) {
    const otp = localStorage.getItem('userOtp');
    if (otp === otpState) {
      setValidated2(true);
      // event.preventDefault();
      // event.stopPropagation();
      userOtpLogin({
        variables: {
          "contact": `${contact}`,
          "otp": `${otp}`
        }
      }).then((data) => console.log(data))
    } else {
      // event.preventDefault();
      setValidated2(false);
      alert("OTP Not Match !!!")
    }
  }

  function generateUserOtp(event) {
    if (contact === '' || contact.length < 10 || contact.length > 10) {
      setValidated(true)
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      event.preventDefault();
      const gOtp = Math.floor(1000 + Math.random() * 9000);
      setValidated(false)
      localStorage.removeItem("userOtp");
      localStorage.setItem('userOtp', gOtp);
      sendOtp({
        variables: {
          "contact": `${contact}`,
          "otp": `${gOtp}`
        }
      })
      swal({
        title: "OTP Send",
        text: "OTP Send on your mobile no.",
        icon: "success",
      })
      setOtp(gOtp)
      setOtpSent(true)
    }
  }

  // if (logindata) {
  //   localStorage.setItem('userId', logindata.userOtpLogin.userId)
  //   // setUserLoginDone(true)
  //   localStorage.setItem('userToken', logindata.userOtpLogin.userToken)
  //   localStorage.setItem('userTokenExpiration', logindata.userOtpLogin.userTokenExpiration)
  //   localStorage.removeItem("userOtp")
  //   // console.log("login done");
  //   return <Navigate to="/" />

  // }
  // // console.log(userToken, "line123");
  // if (userToken) {
  //   // console.log("login susefully");
  //   return <Navigate to="/" />
  // }
  if (logindata) {
    localStorage.setItem('userId', logindata.userOtpLogin.userId)
    localStorage.setItem('userToken', logindata.userOtpLogin.userToken)
    localStorage.setItem('userTokenExpiration', logindata.userOtpLogin.userTokenExpiration)
    localStorage.removeItem("userOtp")

    // Navigating back to the previous page
    navigate(-1);


    return null; // Return null since you're navigating away
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Login", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="login-register-area pt-50 pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={generateUserOtp}>
                              <input
                                type="number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Enter Your Mobile Number"
                              />
                              {gotp ? <>
                                <input
                                  type="number"
                                  value={otpState}
                                  onChange={(e) => setOtpState(e.target.value)}
                                  placeholder="Enter Your OTP"
                                />
                                <div className="button-box">

                                  <button type="button" onClick={() => handleClick()}>
                                    <span>Submit OTP</span>
                                  </button>
                                </div>

                              </>
                                :

                                <div className="button-box">

                                  <button type="submit">
                                    <span>Send OTP</span>
                                  </button>
                                </div>
                              }
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>

                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
