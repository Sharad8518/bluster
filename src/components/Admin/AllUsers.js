
import { QUERY_GET_ALL_USER } from '../../graphql/Query'
import { useMutation, useQuery } from '@apollo/client';
import { Button, Col, Container, Form, Image, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {UPDATE_USER} from '../../graphql/Mutations'
const AllUsers = () => {
    const { data: getAllUser, loading: userLoading } = useQuery(QUERY_GET_ALL_USER);
    const [updateUser]= useMutation(UPDATE_USER,{
        refetchQueries :[
            QUERY_GET_ALL_USER
        ]
    })
    const [checked, setChecked] = useState(false);
    const [colour, setcolour] = useState('primary');
    const [selectedData , setSelectedData] = useState(null)
    let count = 1;
    const handleBlock = (status,data) => {
       console.log(status,data.id,"line 22");
        updateUser({
            variables : {
                userInput :{
                    "id" : `${data.id}`,
                    "fName" : `${data.fName}`,
                    "lName" : `${data.lName}`,
                    "email" : `${data.email}`,
                    "status" : `${status}`,
                }
            }
        }).then((data)=>{
            console.log(data);
        }).catch((e)=>
          console.log(e)
        )

    }

    return (
        <>

            <Table responsive bordered style={{fontSize:12}}>
                <thead className='table-head'>
                    <tr>
                        <th>S.no.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Block/Unblock</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        userLoading ?
                            <Spinner animation="border" variant="success" className='mx-auto d-block'  />

                            :
                            getAllUser && getAllUser.getAllUser.map((data) => {


                                return (

                                    <tr className='table-data'>
                                        <td>{count++}</td>
                                        <td>{data.fName}</td>
                                        <td>{data.lName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.contact}</td>
                                        <td>{data.status}</td>
                                        <td>
                                            {
                                                data.status !== 'blocked' ?
                                                    <Button size="sm" variant={"danger"} onClick={() => handleBlock("blocked",data)} >
                                                        Block
                                                    </Button> :
                                                    <Button size="sm" variant={"primary"} onClick={() => handleBlock("active",data)} >
                                                        Unblock
                                                    </Button>
                                            }

                                        </td>
                                    </tr>

                                )
                            }
                            )

                    }
                </tbody>
            </Table>
        </>
    )
}

export default AllUsers 