import React, { useState } from 'react'
import uniqid from 'uniqid';
import AWS from 'aws-sdk';
import { Spinner, Table, Image, Button, Modal, Card, Form, Carousel } from 'react-bootstrap';
import { QUERY_All_Product } from '../../graphql/Query'
// import { MUTATION_DELETE_BUY_ORDER } from '../../graphql/Mutations'
import { MUTATION_UPDATE_PRODUCT, MUTATION_DELETE_PRODUCT, } from '../../graphql/Mutations'
import { useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';

const AllProducts = () => {
    const { data: buyOrderData, loading: buyProLoading } = useQuery(QUERY_All_Product);
    // Use DummyProductData to populate your product list

    const [deleteProductByID] = useMutation(MUTATION_DELETE_PRODUCT, {
        refetchQueries: [
            QUERY_All_Product
        ]
    })

    const [updateBuyProduct] = useMutation(MUTATION_UPDATE_PRODUCT, {
        refetchQueries: [
            QUERY_All_Product
        ]
    })

    console.log(buyOrderData);
    let count = 1
    const handleDelete = (id) => {
        deleteProductByID({
            variables: {
                "productId": `${id}`
            }
        }).then(() => {
            swal({
                title: 'Successfull!!!',
                text: ' Product Deleted Successfully',
                icon: 'success',
            });

        }).catch((e) => console.log(e))


    }
    // edit modal
    const ID = "AKIA6GB4RFKTJXDPLPOH";
    const SECRET = "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";
    const BUCKET_NAME = "sanjaytestbucket";
    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET,
    });
    let imageKey = []

    // const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

    const [lgShow, setLgShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("");
    const [editProductName, setEditProductName] = useState("");
    const [editProductSubtitle, setEditProductSubtitle] = useState("");
    const [editProductMRP, setEditProductMRP] = useState("");
    const [editProductDescription, setEditProductDesc] = useState("");
    const [editSellProductPrice, setEditSellProductPrice] = useState("");
    const [editstockAvailabiltyState, setEditStockAvailabiltyState] = useState(null);
    const [editcategoryState, setEditCategoryState] = useState(null);
    const [edittagState, setEditTagState] = useState(null);
    const [editadditionInfoState, setEditAditionalInfoState] = useState(null);
    const [editImages, setEditImages] = useState(null);


    console.log(selectedOrder);
    const handleEdit = (order) => {
        setLgShow(true);
        setSelectedOrder(order)
        setEditProductName(order.productName)
        setEditProductSubtitle(order.productSubTitle)
        setEditProductMRP(order.productMRP)
        setEditSellProductPrice(order.productSellPrice)
        setEditProductDesc(order.productDescription)
        setEditAditionalInfoState(order.productAditionalInformartion);
        setEditCategoryState(order.category);
        setEditStockAvailabiltyState(order.stockAvailabilty);
        setEditTagState(order.tag);
        setEditImages([]);
    }

    //Categories 
    const categories = [
        "Airpods",
        "Earphone Headphone",
        "Neckband",
        "Smart watch",
        "Trimmers",
        "Powerbanks",
        "Speaker",
        "Womens Essential",
        "Gadgets",
    ];
    console.log(editProductName);
    const handleEditChanges = () => {

        updateBuyProduct({
            variables: {
                "productInput": {
                    "id": `${selectedOrder.id}`,
                    productName: editProductName,
                    productSubTitle: editProductSubtitle,
                    productMRP: editProductMRP,
                    productSellPrice: editSellProductPrice,
                    productDescription: editProductDescription,
                    additionInformation: editadditionInfoState,
                    category: editcategoryState,
                    stockAvailabilty: editstockAvailabiltyState,
                    tag: edittagState,
                    // image: editImages,
                }
            }
        }).then(() => {
            swal({
                title: 'Successfull!!!',
                text: ' Product Edited Successfully',
                icon: 'success',
            });

        }).catch((e) => {
            console.log(e);
        })
        setLgShow(false)
    }
    const handleImagesUpload = () => {
        try {
            editImages.map(async (fileData) => {
                const uniqueId = uniqid();
                var regex = new RegExp('[^.]+$');
                var extension = fileData.name.match(regex);
                var uniqueFileName = "bluster" + '-' + uniqueId + '-' + uniqueId + '.' + extension[0];
                imageKey.push(uniqueFileName)
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: uniqueFileName,
                    Body: fileData,
                };
                s3.upload(params, function (err, data) {
                    if (err) {
                        throw err;
                    } else {
                        swal({
                            title: 'Successfull!!!',
                            text: ' Uploaded Successfully',
                            icon: 'success',
                        });

                        setEditImages([])

                    }
                });
            })

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Table responsive bordered style={{ fontSize: 12 }}>
                <thead className='table-head'>
                    <tr>
                        <th>s.no.</th>
                        <th>Product Name</th>
                        <th>Product Subtitle</th>
                        <th>Product MRP</th>
                        <th>Product Sell Price</th>
                        <th>Product Description</th>
                        <th>Product Category</th>
                        <th>Product Tag</th>
                        <th>Product Stock Availabilty</th>
                        <th>Images</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        buyProLoading ?
                            <Spinner animation="border" variant="success" className='mx-auto d-block' />
                            : buyOrderData && buyOrderData?.getAllProducts.map((order) =>
                                <tr>
                                    <td>
                                        {count++}
                                    </td>
                                    <td>
                                        {order.productName}
                                    </td>
                                    <td>
                                        {order.productSubTitle}
                                    </td>
                                    <td>
                                        {order.productMRP}
                                    </td>
                                    <td>
                                        {order.productSellPrice}
                                    </td>
                                    <td>
                                        {order.productDescription}
                                    </td>
                                    <td>
                                        {order.category}
                                    </td>
                                    <td>
                                        {order.tag}
                                    </td>
                                    <td>
                                        {order.stockAvailabilty}
                                    </td>
                                    <td>
                                        <Carousel>
                                            {
                                                order?.image?.map((image) =>
                                                    <Carousel.Item>
                                                        <Image fluid src={`https://sanjaytestbucket.s3.ap-south-1.amazonaws.com/${image}`} style={{width:500, height:100}}></Image>
                                                    </Carousel.Item>
                                                )
                                            }
                                        </Carousel>
                                    </td>
                                    <td> <Button size="sm" style={{ fontSize: "11px" }} onClick={() => handleEdit(order)}> Edit  </Button> </td>
                                    <td> <Button size="sm" variant='danger' style={{ fontSize: "11px" }} onClick={() => handleDelete(order.id)} > Delete  </Button> </td>
                                </tr>

                            )


                    }
                </tbody>
            </Table>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton >
                    <Modal.Title>
                        Edit Buy Products
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card style={{ width: '46rem' }} className='mx-auto d-block' >
                        <Card.Body>
                            <Form   >
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={editProductName}
                                        onChange={(e) => setEditProductName(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Subtitle</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Product Subtitle"
                                        value={editProductSubtitle}
                                        onChange={(e) => setEditProductSubtitle(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product MRP</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Product MRP (Rs)"
                                        value={editProductMRP}
                                        onChange={(e) => setEditProductMRP(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Description"
                                        value={editProductDescription}
                                        onChange={(e) => setEditProductDesc(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Sell Price</Form.Label>
                                    <Form.Control

                                        type="number"
                                        placeholder="Product Sell Price"
                                        value={editSellProductPrice}
                                        onChange={(e) => setEditSellProductPrice(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Category</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        value={editcategoryState}
                                        onChange={(e) => setEditCategoryState(e.target.value)}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Tag</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Tag"
                                        value={edittagState}
                                        onChange={(e) => setEditTagState(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Stock Availabilty</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Stock Availabilty"
                                        value={editstockAvailabiltyState}
                                        onChange={(e) => setEditStockAvailabiltyState(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                {/* <Form.Group controlId="validationCustom01">
                                    <Form.Label>Product Images</Form.Label>
                                    <Form.Control
                                        type="file"
                                        placeholder="Product Images"
                                        value={editImages}
                                        onChange={(e) => setEditImages(e.target.value)}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                {editImages ? editImages.map((image) => {
                                    return (
                                        <span style={{ marginLeft: "1rem" }}> {image.name}</span>
                                    )
                                }) : ""} */}
                                {/* <div>
                                    <Button style={{ fontSize: "11px" }} onClick={() => handleImagesUpload()} > Upload </Button>

                                </div> */}

                            </Form>
                        </Card.Body>
                    </Card>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={() => handleEditChanges()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default AllProducts