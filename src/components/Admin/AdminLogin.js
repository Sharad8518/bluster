import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
// import Lottie from 'react-lottie';
// import * as animationData from '../../Images/81243-login-successfully.json'
import '../../ComponentsCss/AdminCss/Admin.css'
// import Navigation from '../Navigation';
// import Footer from '../Footer';
import { useMutation } from '@apollo/client';
import { MUTATION_ADMIN_LOGIN } from '../../graphql/Mutations';
import { Navigate } from 'react-router-dom';

export default function AdminLogin() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        // animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const token = localStorage.getItem('adminToken')
    const [error, setError] = useState(false)

    const [adminLogin, { data, loading, error: errorM }] = useMutation(MUTATION_ADMIN_LOGIN, {
        onError(error) {
            setError(true)
        }
    });
    console.log("loading", errorM)

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(false);
            event.preventDefault();
            adminLogin({
                variables: {
                    "username": `${username}`,
                    "password": `${password}`
                }
            })
        }
    };

    if (data) {
        localStorage.setItem('adminToken', data.adminLogin.adminToken)
        localStorage.setItem('adminId', data.adminLogin.adminId)
        return <Navigate to="/admindashboard/allorder" />
    }

    if (token) {
        return <Navigate to="/admindashboard/allorder" />
    }
    return (
        <>
            {/* <Navigation /> */}
            <Container className='adminloginmain'>
                <Card className='adminlogincard'>
                    <Row>
                        <Col md={6}>
                            <div style={{ height: '100%', width: '100%' }}>
                               {/* <Lottie options={defaultOptions}
                                 style={{ marginTop: '30px' }}
                                    height={250}
                                    width={250}
                                /> */}
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='adminlog'>
                                <div>
                                    <h4 style={{ textAlign: 'center', fontWeight: 500, textDecoration: 'underline 2px #000000' }}>Admin Login</h4>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Username"
                                                    className='txtadmin'
                                                    onChange={(e) => setUsername(e.target.value)} value={username}
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    placeholder="Enter Your Password"
                                                    className='txtadmin'
                                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>

                                        </Row>
                                        {
                                            error ?
                                                <h1 style={{ fontSize: '12px', color: 'red', textAlign: 'center' }}>Username & Password not match!!!</h1> : ''
                                        }
                                        {
                                            loading ?
                                                <Spinner animation="border" variant="success" className='mx-auto d-block' />
                                                :
                                                <Button type="submit" className='btnadmin mx-auto d-block'>Log In</Button>
                                        }
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
            {/* <Footer /> */}
        </>
    )
}
