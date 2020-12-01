import React, { useState, useEffect } from 'react';
import './MainContainer.css';
import gridViewLogo from './assets/grid-view.png';
import listViewLogo from './assets/list-view.png';
import axios from 'axios';

import { Container, Row, Col, Card, Navbar, Nav, NavDropdown, Button, DropdownButton, Dropdown, ButtonGroup, Image, ListGroup, Modal, Badge } from 'react-bootstrap';



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
    const [isListView, setIsListView] = useState(true);
    const [filterCount, setFilterCount] = useState(0);

    //Modal State Hooks
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

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
                            {/* <Button variant="outline-danger mr-2" onClick={handleShow}>Manage Filters</Button> */}
                            <Button variant="outline-danger mr-2" onClick={() => {setModalShow(true)}}>Apply Filters <Badge variant="danger">{filterCount}</Badge></Button>
                            <DropdownButton as={ButtonGroup} variant="outline-info" title={sortingType} id="btn-grp-filter-sort" onSelect={(evt) => sortArray(evt)}>
                                <Dropdown.Item eventKey="recentPaymentFirst">Recent Payment First</Dropdown.Item>
                                <Dropdown.Item eventKey="oldestPaymentFirst">Oldest Payment First</Dropdown.Item>
                                <Dropdown.Item eventKey="paymentAmountLowToHigh">Payment Amount: Low to High</Dropdown.Item>
                                <Dropdown.Item eventKey="paymentAmountHighToLow">Payment Amount: High to Low</Dropdown.Item>
                        </DropdownButton>
                        </ButtonGroup>

                        <img src={gridViewLogo} alt="gridViewLogo" className="img-icon mr-2 ml-3 img-thumbnail" 
                            data-toggle="tooltip" data-placement="bottom" title="Grid View" onClick={() => {setIsListView(false)}}/>
                        <img src={listViewLogo} alt="listViewLogo" className="img-icon img-thumbnail" 
                            data-toggle="tooltip" data-placement="bottom" title="List View" onClick={() => {setIsListView(true)}}/>
                    </div>
               </div>
               {isListView ? printPaymentList(payments) : printPaymentListGrid(payments)}
            </Container>
            
            <>
                <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Add Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Select one filter from the following dropdown:
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary">Apply</Button>
                </Modal.Footer>
                </Modal>
            </>

            <>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    backdrop="static"
                    keyboard={false}
                    filterCount={filterCount}
                    handleShow={handleShow}
                />
            </>
        </div>
    );   
}

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manage Filters - Payments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-danger">Filters applied: {props.filterCount}</h5>
          <p>
            Select one or more filters from below to get payments according
            to Payment Date, Amount, Category, Payment Type.
          </p>
          {/* <label className="ml-3"><span class="badge badge-pill badge-primary pb-2">Add New Filter
          </span></label> */}
          <Button variant="warning" className="rounded-button" onClick={props.handleShow}>Add Filter</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


//to return all the payments in UI in Grid Format
function printPaymentListGrid(payments){
    return (
        <>
            <Row>
                {payments.map(payment => {
                    return (
                        <div className="col-sm-4 mb-4" key={payment.id}>
                        <Card>
                         <Card.Body>
                         <div className="small mb-1">{payment.category}</div>
                            <h6 className="card-title font-weight-bold">{payment.payDescription}</h6>
                             <Card.Text>
                                <div>Amount: ₹{payment.amount}</div>
                                <div>{payment.payType === 'Credit' ? 'Received on: ' : 'Paid on: '} {getFormattedDate(payment.transactionDate)}</div>
                             </Card.Text>
                         </Card.Body>
                     </Card>
                     </div>
                    );
                })}    
            </Row>
        </>
    );
}

//to return all the payments in UI in List Format
function printPaymentList(payments){
    return (
        <>
            <ListGroup>
                {payments.map(payment => {
                    return (
                    <ListGroup.Item key={payment.id}>
                        <span className="font-weight-bold mr-2">{payment.payDescription}</span>
                        <span className="mr-2 ml-2">|</span>
                        <span className="mr-2 ml-2">{payment.payType === 'Credit' ? 'Received ' : 'Paid'} <span className="font-weight-bold">₹{payment.amount}</span> for {payment.category}</span>
                        <span className="mr-2 ml-2 small" style={{float: 'right'}}>{payment.payType === 'Credit' ? 'Received on ' : 'Paid on '}{getFormattedDate(payment.transactionDate)}</span>
                    </ListGroup.Item>
                    );
                })};
            </ListGroup>
        </>
    );
}


function getFormattedDate(dateString){
    let months = [-1, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let splitDate = dateString.split('-');
    /*
        splitDate[0] = dd
        splitDate[1] = MM
        splitDate[2] = yyyy
    */
    return months[parseInt(splitDate[1], 10)] + ' ' + splitDate[0] + ', ' + splitDate[2];
}


export default MainContainer;





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