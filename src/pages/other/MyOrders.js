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
            { label: "My Orders", path: process.env.PUBLIC_URL + pathname }
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
                        <span>1 .</span> My Order Details{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Table striped bordered responsive>
                          <thead className='table-head'>
                            <tr>
                              <th>S.no.</th>
                              <th>Product Image </th>
                              <th>Order No</th>
                              <th>User Name </th>
                              <th>Product Name </th>
                              <th>Product price </th>
                              <th>Total Amount</th>
                              <th>Address</th>
                              <th>Order Status</th>
                              <th>Tracking Details</th>
                              {/* <th>User Details</th> */}
                            </tr>
                          </thead>
                          <tbody>

                            {
                              ordersLoading ? (
                                <Spinner animation="border" variant="success" className='mx-auto d-block' />
                              ) : (
                                getBuyOrdersId &&
                                getBuyOrdersId?.getOrderByUserId?.slice(0).reverse().map(order => {
                                  let totalAmount = 0;

                                  return (
                                    <tr className={`table-data ${order.status === 'Cancel Order' ? 'cancel-order' : ''}`} key={order.orderId}>
                                      <td>{count++}</td>
                                      <td>
                                        {
                                          order.productDetails.map((product, index) => (
                                            <img
                                              key={index}
                                              src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${product.productImage}`}
                                              width={70}
                                              alt={`Product ${index}`}
                                            />
                                          ))}
                                      </td>
                                      <td> {order.orderId} </td>
                                      <td> {order.fName} {order.lName}</td>
                                      <td>
                                        {order.productDetails.map((product, index) => (
                                          <div key={index}>{product.productName}</div>
                                        ))}
                                      </td>
                                      <td>
                                        {order.productDetails.map((product, index) => {
                                          totalAmount += parseInt(product?.productMRP);
                                          return (
                                            <div key={index}>Rs. {product.productMRP}</div>
                                          )
                                        }
                                        )}
                                      </td>
                                      <td>
                                        Rs. {totalAmount}
                                      </td>
                                      <td> {order.address} {order.city} {order.pincode} {order.state}</td>
                                      <td> {order.status}</td>
                                      <td style={{ cursor: "pointer" }} onClick={() => handleTrackDetail(order)} >  < FaShippingFast className='fs-3' /> </td>
                                    </tr>
                                  )
                                }
                                )
                              )
                            }

                          </tbody>
                        </Table>
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
