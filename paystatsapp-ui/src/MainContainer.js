import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav, NavDropdown } from 'react-bootstrap';

function MainContainer(){
    return(
        <div>
            <NavigationBar/>
            <SubContainer/>
        </div>
    );
}

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
    return(
        <div>
            <Container>
                <Row>
                    <Card>
                        <Card.Body>This is some text within a card body.</Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    );
}
export default MainContainer;