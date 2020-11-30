import React, { useState, useEffect } from 'react';
import './MainContainer.css';
import gridViewLogo from './assets/grid-view.png';
import listViewLogo from './assets/list-view.png';
import axios from 'axios';

import { Container, Row, Col, Card, Navbar, Nav, NavDropdown, Button, DropdownButton, Dropdown, ButtonGroup, Image, ListGroup, Modal } from 'react-bootstrap';



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
                <Nav.Link>Dashboard</Nav.Link>
                <Nav.Link>View Payments</Nav.Link>
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
    const [sortingType, setSortingType] = useState('Sort By: ');

    //Modal State Hooks
    const [show, setShow] = useState(false);

    //Effect hook to load all the payments
    useEffect(() => {
        //fetching all the payments
        axios.get(`http://localhost:7777/paymentss/all`).then((response) => {
            setPayments(response.data);
        });
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function sortArray(sortType) {
        switch (sortType) {
          case "recentPaymentFirst":
            setSortingType("Recent Payment First");
            setPayments(payments.sort((p1, p2) => {
                var pp1 = p1.transactionDate.split('-').reverse().join();
                var pp2 = p2.transactionDate.split('-').reverse().join();
                return pp1>pp2 ? -1 : (pp1<pp2 ? 1 : 0);
            }));
            break;
    
          case "oldestPaymentFirst":
            setSortingType("Oldest Payment First");
            setPayments(payments.sort((p1, p2) => {
                var pp1 = p1.transactionDate.split('-').reverse().join();
                var pp2 = p2.transactionDate.split('-').reverse().join();
                return pp1<pp2 ? -1 : (pp1>pp2 ? 1 : 0);
            }));
            break;
    
          case "paymentAmountLowToHigh":
            setSortingType("Payment Amount: Low to High");
            setPayments(payments.sort((p1, p2) => p1.amount - p2.amount));
            break;
    
          case "paymentAmountHighToLow":
            setSortingType("Payment Amount: High to Low");
            setPayments(payments.sort((p1, p2) => p2.amount - p1.amount));
            break;

          default: 
            console.log("ERROR: Wrong Sorting Type selected. Please try again!");
        }
    }

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
                            <Button variant="outline-warning mr-2">Go to Dashboard</Button>
                            <Button variant="outline-danger mr-2" onClick={handleShow}>Manage Filters</Button>
                            <DropdownButton as={ButtonGroup} variant="outline-info" title={sortingType} id="btn-grp-filter-sort" onSelect={function(evt){sortArray(evt)}}>
                                <Dropdown.Item eventKey="recentPaymentFirst" href="#/action-1">Recent Payment First</Dropdown.Item>
                                <Dropdown.Item eventKey="oldestPaymentFirst" href="#/action-2">Oldest Payment First</Dropdown.Item>
                                <Dropdown.Item eventKey="paymentAmountLowToHigh" href="#/action-4">Payment Amount: Low to High</Dropdown.Item>
                                <Dropdown.Item eventKey="paymentAmountHighToLow" href="#/action-5">Payment Amount: High to Low</Dropdown.Item>
                        </DropdownButton>
                        </ButtonGroup>

                        <img src={gridViewLogo} alt="gridViewLogo" className="img-icon mr-2 ml-3 img-thumbnail"/>
                        <img src={listViewLogo} alt="listViewLogo" className="img-icon img-thumbnail"/>
                    </div>
               </div>
               {printPaymentList(payments)}
            </Container>
            
            <>
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Manage Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary">Apply</Button>
                </Modal.Footer>
                </Modal>
            </>
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
                    <ListGroup.Item key={payment.id}>
                        <span className="font-weight-bold mr-2">{payment.payDescription}</span>
                        <span className="mr-2 ml-2">|</span>
                        {/* <span className="mr-2 ml-2">{payment.category}</span>
                        <span className="mr-2 ml-2">|</span>
                        <span className="mr-2 ml-2">₹{payment.amount}</span>
                        <span className="mr-2 ml-2">|</span>
                        <span className="mr-2 ml-2">{payment.payType}</span> */}
                        <span className="mr-2 ml-2">{payment.payType === 'Credit' ? 'Received ' : 'Paid'} <span className="font-weight-bold">₹{payment.amount}</span> for {payment.category}</span>
                        <span className="mr-2 ml-2 small" style={{float: 'right'}}>Paid on {payment.transactionDate}</span>
                    </ListGroup.Item>

                    // <Card border="primary" style={{ width: '18rem' }}>
                    //     <Card.Header>{payment.payType}</Card.Header>
                    //     <Card.Body>
                    // <Card.Title>{payment.payDescription}</Card.Title>
                    //         <Card.Text>
                    //             Some quick example text to build on the card title and make up the bulk
                    //             of the card's content.
                    //         </Card.Text>
                    //     </Card.Body>
                    // </Card>
                    );
                })}
            </ListGroup>
        </>
    );
}

//simple post using Fetch
// function testFetchPost(){
//     fetch('http://localhost:7777/paymentss/', {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//             "payDescription": "testDesc",
//             "category": "Loan",
//             "amount": "1000",
//             "payType": "Debit",
//             "transactionDate": "13-03-2020"
//         })
//     })
//     .then(res => {
//         if(res.ok){
//             console.log("Response Received");
//             return res.json();
            
//         }else{
//             console.log("ERROR occured");
//         }
//     })
//     .then(data => console.log(data));
// }


export default MainContainer;