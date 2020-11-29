import React, { useState, useEffect } from 'react';
import './MainContainer.css';
import gridViewLogo from './assets/grid-view.png';
import listViewLogo from './assets/list-view.png';
import axios from 'axios';

import { Container, Row, Col, Card, Navbar, Nav, NavDropdown, Button, DropdownButton, Dropdown, ButtonGroup, Image, ListGroup } from 'react-bootstrap';



function MainContainer(){

    return(
        <div>
            <NavigationBar/>
            <SubContainer/>
        </div>
    );
};

function NavigationBar(){
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Paystats</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link>View Payments</Nav.Link>
                <Nav.Link>Add Payment</Nav.Link>
                <NavDropdown title="Manage" id="manage-dropdown">
                    <NavDropdown.Item href="#payCategory">Payment Category</NavDropdown.Item>
                    <NavDropdown.Item href="#payType">Payment Type</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
}

function SubContainer(){
    
    //All the state hooks
    const [payments, setPayments] = useState([]);

    //Effect hook to load all the payments
    useEffect(() => {
        axios.get(`http://localhost:7777/paymentss/all`).then((response) => {
            setPayments(response.data);
        });
    }, []);

    return(
        <div>
            <Container className="mt-2">
               
               <div className="mb-4 mt-4 border-bottom border-dark heading-border clearfix">
                   <div className="float-left">
                       <h4>View Payments</h4>
                       <p>Showing {payments.length} results</p>
                    </div>
                   <div className="float-right mb-2">
                        <ButtonGroup>
                            <Button variant="info">Manage Filters</Button>
                            <DropdownButton as={ButtonGroup} variant="outline-info" title="Sort By: " id="btn-grp-filter-sort">
                                <Dropdown.Item href="#/action-1">Most Recent Payment First</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Oldest Payment First</Dropdown.Item>
                                <Dropdown.Item href="#/action-4">Payment Amount: Low to High</Dropdown.Item>
                                <Dropdown.Item href="#/action-5">Payment Amount: High to Low</Dropdown.Item>
                                <Dropdown.Item href="#/action-6">Recently Added Payment</Dropdown.Item>
                        </DropdownButton>
                        </ButtonGroup>

                        <img src={gridViewLogo} className="img-icon mr-2 ml-3 img-thumbnail"/>
                        <img src={listViewLogo} className="img-icon img-thumbnail"/>
                    </div>
               </div>
               {printPaymentList(payments)}
            </Container>
        </div>
    );
    
}

//to return all the payments in UI
function printPaymentList(payments){
    return (
        <>
            {/* <div>{payments.map( d => <div>{JSON.stringify(d)}</div>)}</div> */}
            <ListGroup>
                {payments.map(payment => {
                    return (
                    <ListGroup.Item>
                        <span className="font-weight-bold mr-2">{payment.payDescription}</span>
                        <span className="mr-2 ml-2">|</span>
                        <span className="mr-2 ml-2">{payment.category}</span>
                        <span className="mr-2 ml-2">|</span>
                        <span className="mr-2 ml-2">₹{payment.amount}</span>
                        <span className="mr-2 ml-2">|</span>
                        <span className="mr-2 ml-2">{payment.payType}</span>
                    <span className="mr-2 ml-2 small" style={{float: 'right'}}>Paid on {payment.transactionDate}</span>
                    </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </>
    );
}

//simple post using Fetch
function testFetchPost(){
    fetch('http://localhost:7777/paymentss/', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "payDescription": "testDesc",
            "category": "Loan",
            "amount": "1000",
            "payType": "Debit",
            "transactionDate": "13-03-2020"
        })
    })
    .then(res => {
        if(res.ok){
            console.log("Response Received");
            return res.json();
            
        }else{
            console.log("ERROR occured");
        }
    })
    .then(data => console.log(data));
}


export default MainContainer;