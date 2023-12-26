
import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { MUTATION_UPDATE_PRO_IMAGE } from '../../../graphql/Mutations'
import { QUERY_GET_SELL_PRODUCT } from '../../../graphql/Query'
import { useMutation } from '@apollo/client'
import uniqid from "uniqid";
import swal from 'sweetalert';
import AWS from "aws-sdk";


const ID = "AKIA6GB4RFKTJXDPLPOH";
const SECRET = "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";
const BUCKET_NAME = "sanjaytestbucket";

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
});
const imageKey = []

const EditImage = (props) => {
    const { data, imagemodal, setImageModal } = props
    console.log("line10", data)
    // 
    const [updateProductImage] = useMutation(MUTATION_UPDATE_PRO_IMAGE, {
        refetchQueries: [
            QUERY_GET_SELL_PRODUCT
        ]
    })
    //
    const [imageBox, setImageBox] = useState('')
    const [image, setImage] = useState(null);
    console.log("image name", image?.name)
    const handleCloseModal = () => {
        setImageModal(false);
    };

    const handleChangeImage = () => {

        //  image uploading 
        try {
            const uniqueId = uniqid();
            var regex = new RegExp('[^.]+$');
            var extension = image.name.match(regex);
            var uniqueFileName = 'hellofi-img' + uniqueId + '.' + extension[0];
            setImageBox(uniqueFileName)
            const params = {
                Bucket: BUCKET_NAME,
                Key: uniqueFileName,
                Body: image,
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
                
                }

            });
        } catch (err) {
            swal({
                title: 'Error!!!',
                text: 'Error please try again',
                icon: 'error',
            });
            console.log(err);
        }


        updateProductImage({

            variables: {
                sellProductInput: {
                    "id": `${data.id}`,
                    "category": `${data.category}`,
                    "productDescription": `${data.productDescription}`,
                    "productName": `${data.productName}`,
                    "productType": `${data.productType}`,
                    "series": `${data.series}`,
                    "image": `${uniqueFileName}`,
                    // "image": `${image ? image.name : ''}`,

                    "variant": `${data.variant}`

                }
            }
        }).then((data) => {
            console.log(data);
            setImageModal(false);
        })
    }

    return (
        <div>


            <Modal show={imagemodal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title> Choose Image </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Control
                            required
                            type="file"
                            className='txtinpt'
                            style={{ marginTop: 20 }}
                            placeholder="Image"
                            onChange={(e) => setImage(e.target.files[0])}

                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={() => handleChangeImage()}>
                        Change Image
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditImage;
