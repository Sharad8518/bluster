import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import '../../ComponentsCss/AdminCss/DashboardChart.css'
import { FaCoins, FaShopify, FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { Chart } from 'react-charts'
import { QUERY_GET_ALL_USER, QUERY_GET_All_ORDERS, QUERY_All_Product } from '../../graphql/Query'
import { useQuery } from '@apollo/client'

export default function DashboardChart() {

    const {data:getAllUser, loading:getAllUserLoading} = useQuery(QUERY_GET_ALL_USER)
    const {data:getAllOrder, loading:getAllOrderLoading} = useQuery(QUERY_GET_All_ORDERS)
    const {data:getAllProduct, loading:getAllProductLoading} = useQuery(QUERY_All_Product)
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            },
            {
                label: 'Series 2',
                data: [[0, 5], [1, 3], [2, 1], [3, 4], [4, 1]]
            },
            {
                label: 'Series 5',
                data: [[0, 6], [1, 8], [2, 1], [3, 4], [4, 1]]
            },
        ],
        []
    )
    const data2 = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            },
            {
                label: 'Series 2',
                data: [[0, 5], [1, 3], [2, 1], [3, 4], [1, 4]]
            },
        ],
        []
    )
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
  console.log(getAllOrder)

    return (
        <>
            <Container className='chjartmain' fluid>
                <Row>
                    <Col md={3}>
                        <Card className='chartcard'>
                            <div className='tx'>
                                <h3>{getAllUser && getAllUser.getAllUser.length}</h3>
                                <p>Total Users</p>
                            </div>
                            <div className='txticon'>
                                <FaUserAlt />
                            </div>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className='chartcard2'>
                            <div className='tx'>
                                <h3>{getAllOrder && getAllOrder.getAllOrders.length}</h3>
                                <p>Total Orders</p>
                            </div>
                            <div className='txticon'>
                                <FaShoppingCart />
                            </div>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className='chartcard3'>
                            <div className='tx'>
                                <h3>{getAllProduct && getAllProduct.getAllProducts.length}</h3>
                                <p>Total Products</p>
                            </div>
                            <div className='txticon'>
                                <FaShopify />
                            </div>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className='chartcard4'>
                            <div className='tx'>
                                <h3>{getAllUser && getAllUser.getAllUser.length}</h3>
                                <p>Total Revenue</p>
                            </div>
                            <div className='txticon'>
                                <FaCoins />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div style={{ height: 300, marginTop: 30 }}>
                            <Chart data={data} axes={axes} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div style={{ height: 300, marginTop: 30 }}>
                            <Chart data={data2} series={{ type: "bar" }}
                                axes={[
                                    {
                                        primary: true,
                                        position: "bottom",
                                        type: "ordinal"
                                    },
                                    {
                                        position: "left",
                                        type: "linear"
                                    }
                                ]} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
