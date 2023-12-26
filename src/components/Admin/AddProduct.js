import React, { useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import swal from 'sweetalert';
import uniqid from 'uniqid';
import AWS from 'aws-sdk';
import { MUTATION_CREATE_PRODUCT } from '../../graphql/Mutations';
import { QUERY_All_Product } from '../../graphql/Query'


const ID = process.env.REACT_APP_AWS_ACCESSS_ID;
const SECRET = process.env.REACT_APP_AWS_ACCESSS_KEY;
const BUCKET_NAME = 'sanjaytestbucket';


const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});
let imageKey = []

const AddProduct = () => {

    const [productNameState, setProductNameState] = useState("");
    const [productSubtitleState, setProductSubtitleState] = useState("");
    const [productSellPriceState, setProductSellPriceState] = useState("");
    const [productDescState, setProductDescState] = useState("");
    const [productMRPState, setProductMRPState] = useState(null);
    const [stockAvailabiltyState, setStockAvailabiltyState] = useState(null);
    const [categoryState, setCategoryState] = useState(null);
    const [tagState, setTagState] = useState(null);
    const [additionInfoState, setAditionalInfoState] = useState(null);
    const [images, setImages] = useState(null);
    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(true);


    const [createProduct] = useMutation(MUTATION_CREATE_PRODUCT
        , {
            refetchQueries: [
                QUERY_All_Product
            ]
        }
    )


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
    // images selecting
    const handleIamges = (e) => {
        setImages([...e.target.files])
    }



    // data send 
    const handleSave = () => {




        createProduct({
            variables: {
                productInput: {
                    productName: productNameState,
                    productSubTitle: productSubtitleState,
                    productMRP: productMRPState,
                    productDescription: productDescState,
                    additionInformation: additionInfoState,
                    category: categoryState,
                    productSellPrice: productSellPriceState,
                    stockAvailabilty: stockAvailabiltyState,
                    tag: tagState,
                    image: imageKey,
                },
            },
        })
            .then(() => {
                swal({
                    title: 'Success',
                    text: 'Product Added Successfully',
                    icon: 'success',
                });
            })
            .catch((error) => {
                console.error(error);
            });

        setProductNameState('');
        setProductSubtitleState('');
        setProductSellPriceState('');
        setProductMRPState('');
        setProductDescState('');
        setAditionalInfoState('');
        setCategoryState('');
        setStockAvailabiltyState('');
        setTagState('');
        setImages([]);
        imageKey = [];
    };

    //images Uploading
    const handleImagesUpload = () => {
        try {
            images.map(async (fileData) => {
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

                        setImages('')
                        setSaveButtonDisabled(false);

                    }
                });
            })

        } catch (err) {
            console.log(err);
        }
    }
    console.log("image key", imageKey);
    return (
        <>
            <Container>

                <Card style={{ width: '55rem' }} className='mx-auto d-block' >
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center" }} >Add Buy Product Here</Card.Title>
                        <Form >
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product Name"
                                    value={productNameState}
                                    onChange={(e) => setProductNameState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product Subtitle</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows={2}
                                    placeholder="Product Subtitle"
                                    value={productSubtitleState}
                                    onChange={(e) => setProductSubtitleState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product Sell Price</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Product Price (Rs)"
                                    value={productSellPriceState}
                                    onChange={(e) => setProductSellPriceState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product MRP</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Product MRP"
                                    value={productMRPState}
                                    onChange={(e) => setProductMRPState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows={3}
                                    placeholder="Product Description"
                                    value={productDescState}
                                    onChange={(e) => setProductDescState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Additional Info</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows={3}
                                    placeholder="Additional Info"
                                    value={additionInfoState}
                                    onChange={(e) => setAditionalInfoState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product Category</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    value={categoryState}
                                    onChange={(e) => setCategoryState(e.target.value)}
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
                                <Form.Label>Product Stock Availabilty</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Stock availability"
                                    value={stockAvailabiltyState}
                                    onChange={(e) => setStockAvailabiltyState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Tag"
                                    value={tagState}
                                    onChange={(e) => setTagState(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="validationCustom01">
                                <Form.Label>Product Images</Form.Label>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={handleIamges} multiple accept="image/*" />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            {images ? images.map((image) => {
                                return (
                                    <span style={{ marginLeft: "1rem" }}> {image.name}</span>
                                )
                            }) : ""}
                            <div>
                                <Button style={{ fontSize: "11px" }} onClick={() => handleImagesUpload()} disabled={images ? false : true} > Upload </Button>

                            </div>
                        </Form>
                        <Button onClick={() => handleSave()} className='mx-auto d-block mt-2' disabled={isSaveButtonDisabled}>  Save  </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default AddProduct;
