import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner, Table, Dropdown, Col, Row, Badge, Form } from 'react-bootstrap'
import { QUERY_GET_ACTIVE_ORDERS } from '../../graphql/Query'
import { MUTATION_ORDER_STATUS } from '../../graphql/Mutations'
import { useMutation, useQuery } from '@apollo/client';
import { FaEye, FaPen, FaShippingFast } from 'react-icons/fa'
import Moment from 'react-moment'
import moment from 'moment'

const AllBuyingOrders = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false);
    const [selectedOrder, setSelectedOrder] = useState();


    const [filteredArray, setFilteredArray] = useState();

    const [orderStatus, setOrderStatus] = useState("");
    const [awt, setAwtStatus] = useState("");
    console.log("selectedOrder", selectedOrder)
    useEffect(() => {
        setInterval(() => {
            refetch()
        }, 3000);
    }, [])


    const [updateOrderStatusById] = useMutation(MUTATION_ORDER_STATUS, {
        refetchQueries: [
            QUERY_GET_ACTIVE_ORDERS
        ]
    })
    let count = 1
    const { data: getBuyorders, loading: OrderLoading, refetch } = useQuery(QUERY_GET_ACTIVE_ORDERS, {
        onCompleted: (data) => {
            setFilteredArray(data.getActiveOrders)
        }
    });

    const handleStatusUpdate = (id, data) => {
        setSelectedOrder(data)
        setOrderStatus(data.status)
        setShow(true)

    }
    const handleAwtUpdate = (id, data) => {
        setSelectedOrder(data)
        setAwtStatus(data.awt)
        setShow3(true)
    }

    const handleSubmit = () => {
        updateOrderStatusById({
            variables: {
                "orderId": selectedOrder.id,
                "status": `${orderStatus}`
            }
        })
        handleClose()
    }
    const handleSubmit2 = () => {
        updateOrderStatusById({
            variables: {
                "orderId": selectedOrder.id,
                "awt": `${awt}`
            }
        })
        handleClose3()
    }
    const handleOrderDetail = (order) => {
        setSelectedOrder(order)
        setShow2(true)
    }
    const handleTrackDetail = (data) => {
        setSelectedOrder(data)
        setShow4(true)
    }

    let totalAmount = 0;

    console.log("filteredArray", filteredArray)
    console.log("getBuyorders", getBuyorders)


    // Filter By order id
    const filterByOrderId = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = getBuyorders.getActiveOrders.filter((data) => {
                return data.orderId.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFilteredArray(results);
        }
        else {
            setFilteredArray(getBuyorders.getActiveOrders);
        }
    };

    // Filter By name
    const filterByOrderIdName = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = getBuyorders.getActiveOrders.filter((data) => {
                return data.fName.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFilteredArray(results);
        }
        else {
            setFilteredArray(getBuyorders.getActiveOrders);
        }
    };

    // Filter By contact
    const filterByContact = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = getBuyorders.getActiveOrders.filter((data) => {
                return data.contact.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFilteredArray(results);
        }
        else {
            setFilteredArray(getBuyorders.getActiveOrders);
        }
    };

    // Filter By email
    const filterByEmail = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = getBuyorders.getActiveOrders.filter((data) => {
                return data.email.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFilteredArray(results);
        }
        else {
            setFilteredArray(getBuyorders.getActiveOrders);
        }
    };

    // Filter By email
    const filterByStatus = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = getBuyorders.getActiveOrders.filter((data) => {
                return data.status.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFilteredArray(results);
        }
        else {
            setFilteredArray(getBuyorders.getActiveOrders);
        }
    };

    // Filter By Date
    const filterByDateText = (e) => {
        const finalDate = e.target.value.slice(0, 10);
        const keyword = finalDate;

        console.log(keyword)

        if (keyword !== '') {
            const results = getBuyorders.getActiveOrders.filter((data) => {
                const dateMom = moment(data.createdDateTime);
                const dateMomFormat = dateMom.format('YYYY-MM-DD')
                return dateMomFormat.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFilteredArray(results);
        }
        else {
            setFilteredArray(getBuyorders.getActiveOrders);
        }
    };

    function clearSearchHandle() {
        setFilteredArray(getBuyorders.getActiveOrders);
    }

    return (
        <>
            <h1 style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 20 }}>Buying Orders</h1>
            {
                OrderLoading ?
                    <Spinner animation="border" variant="success" className='mx-auto d-block' />
                    :
                    <Table bordered style={{ marginTop: "10px", fontSize: 12 }}>
                        <thead className='table-head'>
                            <tr>
                                <th>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Search by order id</Form.Label>
                                        <Form.Control style={{ fontSize: 12 }} required type="text" placeholder="Search by order id" onChange={(e) => filterByOrderId(e)} />
                                    </Form.Group>
                                </th>

                                <th>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Search by name</Form.Label>
                                        <Form.Control style={{ fontSize: 12 }} required type="text" placeholder="Search by name" onChange={(e) => filterByOrderIdName(e)} />
                                    </Form.Group>
                                </th>

                                <th>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Search by contact</Form.Label>
                                        <Form.Control style={{ fontSize: 12 }} required type="text" placeholder="Search by contact" onChange={(e) => filterByContact(e)} />
                                    </Form.Group>
                                </th>

                                <th>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Search by email</Form.Label>
                                        <Form.Control style={{ fontSize: 12 }} required type="text" placeholder="Search by email" onChange={(e) => filterByEmail(e)} />
                                    </Form.Group>
                                </th>

                                <th>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Search by date</Form.Label>
                                        <Form.Control style={{ fontSize: 12 }} required type="date" onChange={(e) => filterByDateText(e)} />
                                    </Form.Group>
                                </th>

                                <th>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Search by status</Form.Label>
                                        <Form.Control required as="select" style={{ fontSize: 12 }} onChange={(e) => filterByStatus(e)} >
                                            <option value="">Select a category</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Ready to Ship">Ready to Ship</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancel Order">Cancel Order</option>
                                            <option value="Order Confirmed">Order Confirmed</option>
                                            <option value="RTO">RTO</option>
                                            <option value="RTO in transit">RTO in transit</option>
                                        </Form.Control>
                                    </Form.Group>
                                </th>

                                <th>
                                    <Button size="sm" onClick={() => clearSearchHandle()}>Clear Search</Button>
                                </th>
                            </tr>
                            <tr>
                                <th>S.No.</th>
                                <th>Order No</th>
                                <th>Date/Time</th>
                                <th>Full Name </th>
                                <th>Contact </th>
                                <th>Alternate Contact </th>
                                <th>Email </th>
                                <th>Status</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredArray && filteredArray.slice(0).reverse().map(data =>
                                    <tr>
                                        <td>{count++}</td>
                                        <td> {data.orderId} </td>
                                        <td><Moment format="DD-MM-YYYY, hh:mm a">{data.createdDateTime}</Moment></td>
                                        <td> {data.fName} {data.lName}</td>
                                        <td> {data.contact} </td>
                                        <td> {data.alternateContactNo} </td>
                                        <td> {data.email} </td>
                                        {
                                            data.status === 'Pending' ?
                                                <td>
                                                    <Badge bg="primary" style={{ padding: 5 }}>Pending</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                </td> :

                                                data.status === 'Ready to Ship' ?
                                                    <td>
                                                        <Badge bg="warning" style={{ padding: 5 }}>Ready to Ship</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                    </td> :

                                                    data.status === 'Shipped' ?
                                                        <td>
                                                            <Badge bg="info" style={{ padding: 5 }}>Shipped</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                        </td> :
                                                        data.status === 'Delivered' ?
                                                            <td>
                                                                <Badge bg="success" style={{ padding: 5 }}>Delivered</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                            </td> :
                                                            data.status === 'Order Confirmed' ?
                                                                <td>
                                                                    <Badge bg="success" style={{ padding: 5 }}>Order Confirmed</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                                </td> :
                                                                data.status === 'RTO' ?
                                                                    <td>
                                                                        <Badge bg="info" style={{ padding: 5 }}>RTO</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                                    </td> :
                                                                    data.status === 'RTO in transit' ?
                                                                        <td>
                                                                            <Badge bg="dark" style={{ padding: 5 }}>RTO in transit</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                                        </td> :
                                                                        <td>
                                                                            <Badge bg="danger" style={{ padding: 5 }}>Error</Badge> <span style={{ marginLeft: "5px", cursor: "pointer" }} onClick={() => handleStatusUpdate(data.id, data)}> <FaPen /> </span>
                                                                        </td>

                                        }
                                        <td style={{ cursor: "pointer" }} onClick={() => handleOrderDetail(data)} ><Button size="sm"><FaEye /></Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
            }

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Product Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='mx-auto d-block'>
                            Product Status
                        </Dropdown.Toggle>
                        <div style={{ fontWeight: "bold", textAlign: 'center', marginTop: 20 }} >
                            {orderStatus}
                        </div>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setOrderStatus("Pending")}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("Ready to Ship")}>Ready to Ship</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("Shipped")}>Shipped</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("Delivered")}>Delivered</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("Cancel Order")}>Cancel Order</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("Order Confirmed")}>Order Confirmed</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("RTO")}>RTO</Dropdown.Item>
                            <Dropdown.Item onClick={() => setOrderStatus("RTO in transit")}>RTO in transit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleSubmit}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2} size="lg" >
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Table responsive bordered style={{ fontSize: 12 }}>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>Order No</td>
                                <td>{selectedOrder && selectedOrder.orderId}</td>
                                <td style={{ fontWeight: 'bold' }}>Order Date/Time</td>
                                <td><Moment format="DD-MM-YYYY, hh:mm a">{selectedOrder && selectedOrder.createdDateTime}</Moment></td>
                                <td style={{ fontWeight: 'bold' }}>Full Name</td>
                                <td>{selectedOrder && selectedOrder.fName} {selectedOrder && selectedOrder.lName}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>Contact</td>
                                <td>{selectedOrder && selectedOrder.contact}</td>
                                <td style={{ fontWeight: 'bold' }}>Alternate Contact</td>
                                <td>{selectedOrder && selectedOrder.alternateContactNo}</td>
                                <td style={{ fontWeight: 'bold' }}>Email</td>
                                <td>{selectedOrder && selectedOrder.email}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>Full Address</td>
                                <td colSpan={5}>{selectedOrder && selectedOrder.address} {selectedOrder && selectedOrder.addressTwo} {selectedOrder && selectedOrder.city} {selectedOrder && selectedOrder.state} {selectedOrder && selectedOrder.pincode}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table responsive bordered style={{ fontSize: 12 }}>
                        <thead className='table-head'>
                            <th>Product Name </th>
                            <th>Product Category </th>
                            <th>Product price </th>
                            <th>Product quantity </th>
                            <th>Product Image </th>
                        </thead>
                        <tbody>
                            {
                                selectedOrder?.productDetails?.map((product) => {
                                    totalAmount += parseInt(product?.productMRP);
                                    return (
                                        <>
                                            <tr>
                                                <td> {product.productName} </td>
                                                <td> {product.category} </td>
                                                <td> {product.productMRP} </td>
                                                <td> {product.quantity} </td>
                                                <td> <img src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${product.productImage}`} width={70} /> </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Total: Rs {totalAmount}</p>
                        </Col>
                        <Col>
                            <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Status: {selectedOrder && selectedOrder.status}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose2}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={show3} onHide={handleClose3} >
                <Modal.Header closeButton>
                    <Modal.Title>Update AWB</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <label>Enter AWB No</label>

                    <input onChange={(e) => setAwtStatus(e.target.value)} />



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit2} >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

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
                        <em className='text-danger'><strong>*Tracking Details Not Available*</strong></em>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </>
    )
}

export default AllBuyingOrders