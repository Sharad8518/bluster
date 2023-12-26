import React from 'react'
import { Container, Row, Col, Image, Table } from 'react-bootstrap'
import { useLocation, Link } from 'react-router-dom'
import Moment from 'react-moment'

export default function Thankyou(props) {
    const location = useLocation();
    const orderData = location.state.data.createOrder;
    console.log("location", location.state.data.createOrder)
    return (
        <Container>
            <Row>
                <Col>
                    <Image src={process.env.PUBLIC_URL + " /assets/img/thankyou.jpg"} style={{ width: 300, height: 300 }} fluid className='mx-auto d-block' />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table bordered hover responsive style={{ fontSize: 12 }}>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#a749ff', color: '#fff' }} colSpan={8}>Personal Detail</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>Order Id</td>
                                <td>{orderData.orderId}</td>
                                <td style={{ fontWeight: 'bold' }}>Full Name</td>
                                <td>{orderData.fName} {orderData.lName}</td>
                                <td style={{ fontWeight: 'bold' }}>Contact</td>
                                <td>{orderData.contact}</td>
                                <td style={{ fontWeight: 'bold' }}>Email</td>
                                <td>{orderData.email}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>Alternate Contact</td>
                                <td>{orderData.alternateContactNo}</td>
                                <td style={{ fontWeight: 'bold' }}>Address</td>
                                <td>{orderData.address}, {orderData.addressTwo}, {orderData.city}, {orderData.state}, {orderData.pincode}</td>
                                <td style={{ fontWeight: 'bold' }}>Booking Date/Time</td>
                                <td><Moment format="DD-MM-YYYY, hh:mm a">{orderData.createdDateTime}</Moment></td>
                                <td style={{ fontWeight: 'bold' }}>Status</td>
                                <td>{orderData.status}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#a749ff', color: '#fff' }} colSpan={8}>Product's Detail</td>
                            </tr>
                            {
                                orderData && orderData.productDetails.map(pData =>
                                    <tr>
                                        <td colSpan={4}>{pData.productName}</td>
                                        <td colSpan={1}>₹ {pData.productMRP}</td>
                                        <td colSpan={2}>Category: {pData.category}</td>
                                        <td colSpan={2}>Quantity: {pData.quantity}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="item-empty-area text-center">
                                <div className="item-empty-area__text">
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                        Shop More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
