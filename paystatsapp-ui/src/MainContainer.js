import React from 'react';
import './MainContainer.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import ViewPayments from './payments/ViewPayments';


function MainContainer(){
    return(
    <div>
        <NavigationBar/>
        <ViewPayments/>
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