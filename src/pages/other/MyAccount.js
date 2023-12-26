import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Col, Container, Form, Image, Modal, Row, Spinner, Table, Dropdown, Card } from 'react-bootstrap'
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { FaShippingFast } from 'react-icons/fa'
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { QUERY_GET_ORDERS_USER_ID, QUERY_GET_USER_DETAIL_BY_ID } from '../../graphql/Query'
import { UPDATE_USER } from '../../graphql/Mutations'
import { useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';
import "./userpage.css"

const MyAccount = () => {
  let count = 1
  let { pathname } = useLocation();
  const userId = localStorage.getItem('userId')
  const { data: getBuyOrdersId, loading: ordersLoading } = useQuery(QUERY_GET_ORDERS_USER_ID,
    {
      variables:
      {
        "userId": userId
      }
    });
  const { data: getUserDetailById, loading: userLoading } = useQuery(QUERY_GET_USER_DETAIL_BY_ID,
    {
      variables:
      {
        "userId": userId
      }
    });
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      QUERY_GET_USER_DETAIL_BY_ID
    ]
  })
  // console.log("getid", getBuyOrdersId);
  const [nameState, setNameState] = useState()
  const [emailState, setEmailState] = useState()
  const [lastNameState, setLastNameState] = useState()
  const [contactState, setContactState] = useState()
  const [show, setShow] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose4 = () => setShow4(false);
  const handleShow = () => setShow(true);
  const [selectedOrder, setSelectedOrder] = useState();
  const handleTrackDetail = (data) => {
    setSelectedOrder(data)
    setShow4(true)
  }

  const handleEditClick = () => {
    handleShow();
    setNameState(getUserDetailById.getUserDetailById.fName)
    setLastNameState(getUserDetailById.getUserDetailById.lName)
    setEmailState(getUserDetailById.getUserDetailById.email)
    setContactState(getUserDetailById.getUserDetailById.contact)
  }
  const saveProfile = () => {

    updateUser({
      variables: {
        "userInput": {
          "id": userId,
          "fName": `${nameState}`,
          "lName": `${lastNameState}`,
          "email": `${emailState}`
        }
      }
    }).then((data) => {
      console.log(data)
      swal({
        title: 'Successfull!!!',
        text: ' Profile Edited Successfully',
        icon: 'success',
      });
      handleClose()
    }).catch((e) => console.log(e))
  }
  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-12">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>


                        <div className="myaccount-info-wrapper">

                          {
                            userLoading ? <Spinner animation="border" variant="success" className='mx-auto d-block' />
                              :
                              <Card>
                                <Card.Body>

                                  <Card.Text className='profile-box' >

                                    <div className="profile-content-box" >First Name : </div>
                                    <div className='shadow-sm   bg-white rounded profile-content-box'  > {getUserDetailById.getUserDetailById.fName}
                                    </div>

                                  </Card.Text>
                                  <Card.Text className='profile-box'>
                                    <div className="profile-content-box">Last Name : </div>
                                    <div className='shadow-sm    bg-white rounded profile-content-box'> {getUserDetailById.getUserDetailById.lName} </div>
                                  </Card.Text>
                                  <Card.Text className='profile-box'>
                                    <div className="profile-content-box" > Email : </div>
                                    <div className='shadow-sm   bg-white rounded profile-content-box'> {getUserDetailById.getUserDetailById.email} </div>
                                  </Card.Text>
                                  <Card.Text className='profile-box'>
                                    <div className="profile-content-box"> Contact : </div>
                                    <div className='shadow-sm   bg-white rounded profile-content-box'> {getUserDetailById.getUserDetailById.contact} </div>
                                  </Card.Text>
                                  <div className="billing-back-btn">
                                    <div className="billing-btn">
                                      <button onClick={() => handleEditClick()} >Edit Profile</button>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                          }



                        </div>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input type="text" value={nameState} onChange={(e) => setNameState(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text" value={lastNameState} onChange={(e) => setLastNameState(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input type="email" value={emailState} onChange={(e) => setEmailState(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Phone</label>
                                  <input type="text" value={contactState} onChange={(e) => setContactState(e.target.value)} />
                                </div>
                              </div>

                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button onClick={handleClose} className="btn btn-danger">Close</button>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button onClick={() => saveProfile()} className="btn btn-primary">Save Changes</button>
                              </div>
                            </div>
                          </Modal.Footer>
                        </Modal>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>

      </LayoutOne>

      <Modal show={show4} onHide={handleClose4} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Tracking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive bordered style={{ fontSize: "10px", textTransform: "capitalize" }}>

            <thead>
              <tr>
                <th>awb code </th>
                <th>Shipment id </th>
                <th>order id</th>
                <th>pickup date </th>
                <th>delivered date</th>
                <th>weight</th>
                <th>packages</th>
                <th>current status</th>
                <th>delivered to</th>
                <th>destination</th>
                <th>courier name</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                                selectedOrder?.productDetails?.map((product) => {
                                    totalAmount += parseInt(product?.productMRP);
                                    return ( */}
              <>
                <tr>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                  <td>  </td>
                </tr>
              </>
              {/* )
                                })

                            } */}

            </tbody>


          </Table>
          <div className='text-center'>
            <em className='text-danger'><strong>*Tracking Details are Not Available*</strong></em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </Fragment>

  );
};

export default MyAccount;
