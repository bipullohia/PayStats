import React, { useState, useEffect } from 'react';
import './ViewPayments.css';
import gridViewLogo from '../assets/grid-view.png';
import listViewLogo from '../assets/list-view.png';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import { Container, Row, Card, Button, DropdownButton, Dropdown, ButtonGroup, ListGroup, Modal, Badge } from 'react-bootstrap';

function ViewPayments(){

 //All the state hooks
 const [payments, setPayments] = useState([]);
 const [payTypes, setPayTypes] = useState(['PayType1', 'payType2', 'payType3']);
 const [categories, setCategories] = useState(['Category1', 'Category2', 'Category3', 'Category4', 'Category5', 'Category6', 'Category7', 'Category8']);

 const [sortingType, setSortingType] = useState('Sort By: ');
 const [isListView, setIsListView] = useState(true);
 const [filterCount, setFilterCount] = useState(0);
 const [currentFilter, setCurrentFilter] = useState('');

 const [filters, setFilters] = useState([
     {
         "filterName": "date",
         "label": "Payment Date",
         "isSelected": false, 
         "values": [] //[0] is startDate, [1] is endDate
     }, {
         "filterName": "amount",
         "label": "Payment Amount",
         "isSelected": false,  
         "values": [0, 500] //[0] is minAmount, [1] is maxAmount
     }, {
         "filterName": "category",
         "label": "Payment Category",
         "isSelected": false,
         "values": []  
     }, {
         "filterName": "type",
         "label": "Payment Type",
         "isSelected": false,
         "values": []  
     }
 ]);

 const [state, setState] = useState([
     {
       startDate: new Date(),
       endDate: addDays(new Date(), 7),
       key: 'selection'
     }
   ]);

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
                        <Button variant="outline-danger mr-2" onClick={() => {setModalShow(true)}}> Filters <Badge variant="danger">{filterCount}</Badge></Button>
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
            size="lg"
            show={show}
            onHide={handleClose} 
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Add Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row justify-content-center mt-4">
                <div className="form-group ml-3">
                    <label>Select one filter from the following dropdown:</label>
                    <select className="form-control" id="filterTypeInput" name="filterTypeInput" onChange={(e) => {setFilterAsSelected(e.target.value)}} required>
                        <option disabled selected>-- Select a Filter --</option>
                        {filters.map((filter) => {
                            if(!filter.isSelected){
                                return (
                                    <option key={filter.filterName} value={filter.filterName}>{filter.label}</option>
                                );    
                            }
                        })}
                    </select>
                </div>
                {currentFilter==='amount' ?  displayAmountFilter() : 
                    (currentFilter==='date' ? displayDateFilter() : currentFilter==='category' ? displayCheckboxFilter(categories, 'Payment Categories') : 
                    currentFilter==='type' ? displayCheckboxFilter(payTypes, 'Payment Types') : blankDOMElement())}
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={()=> {applyCurrentFilter()}}>Apply</Button>
            </Modal.Footer>
            </Modal>
        </>

        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop="static"
                keyboard={false}
                filtercount={filterCount}
                handleShow={handleShow}
                filters={filters}
                removeSelectedFilter={(filterName) => removeSelectedFilter(filterName)}
                removeAllFilters={removeAllFilters}
            />
        </>
    </div>
    );

    function handleClose(){
        setCurrentFilter('');    
        setShow(false);
    }

    function handleShow(){
        setShow(true);
    }

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

    function setFilterAsSelected(filterName){
        setCurrentFilter(filterName);
    };

    function addDateValueToFilter(isStartDate, value){
        filters.map((filter)=>{
            if(filter.filterName === 'date'){
                if(isStartDate){
                    filter.values[0] = value;
                }else{
                    filter.values[1] = value;
                }
            }
        })
    }

    function displayDateFilter(){
        return (
            // <DateRangePicker
            // onChange={item => setState([item.selection])}
            // showSelectionPreview={true}
            // moveRangeOnFirstSelection={false}
            // months={2}
            // ranges={state}
            // direction="horizontal"
            // />
            <React.Fragment> 
                <div className="ml-4">
                    <label>Start date:</label>
                    <div>
                        <input type="date" id="start" name="trip-start" onChange={(e)=> {console.log(e.target.value); addDateValueToFilter(true, e.target.value)}}
                        min="1900-01-01" max="2099-12-31">
                        </input>
                    </div>
                </div>
                <div className="ml-2">
                    <label>End date:</label>
                    <div>
                        <input type="date" id="end" name="trip-end" onChange={(e)=> {console.log(e.target.value); addDateValueToFilter(false, e.target.value)}}
                        min="1900-01-01" max="2099-12-31">
                        </input>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    function applyCurrentFilter(){
        //set the current filter as selected
        setCurrentFilterAsSelected();
        //show latest applied filter count
        updateFilterCount();
        //close modal and reset selected fields
        handleClose();
    }

    function setCurrentFilterAsSelected(){
        let updatedFilters = filters.map((filter) => {
            if(filter.filterName === currentFilter){
                filter.isSelected = true;
            }
            return filter;
        });
        setFilters(updatedFilters);
    }

    function displayCheckboxFilter(values, filterType){
        
        function addCheckboxValueToFilter(isChecked, value){
            if(isChecked){
                //add item to the filter values
                filters.map((filter)=>{
                    if(filter.filterName == currentFilter){
                        filter.values.push(value);
                    }
                });
            }else{
                //remove item from the filter values
                filters.map((filter)=>{
                    if(filter.filterName == currentFilter){
                        if(filter.values.length>0){
                            filter.values = filter.values.filter(f => f != value);
                        }
                    }
                });
            }
        }
        
        return (
            <div className="ml-5">
            <label>Select {filterType}: </label>
            <div >
            <div className="form-check">
                {values.map((value) => {
                    return (
                        <div key={value}>
                        <label className="form-check-label">
                        <input type="checkbox" onClick={(e)=> {addCheckboxValueToFilter(e.target.checked, value)}} className="form-check-input" value={value}/>{value}
                        </label>   
                        </div> 
                    );
                })}
            </div>
            </div>
        </div>
        );
    }

    function removeSelectedFilter(filterName){
        filters.map((filter)=> {
            if(filter.filterName === filterName){
                filter.isSelected=false;
            }
        });
        updateFilterCount();
    }

    function removeAllFilters(){
        filters.map((filter)=>{
            filter.isSelected=false;
        });
        updateFilterCount();
    }

    function updateFilterCount(){
        let count = 0;
        filters.map((filter)=> {
            if(filter.isSelected){
                count++;
            }
        });
        setFilterCount(count);
    }

    function displayAmountFilter(){
        let minMaxAmount = [];
        filters.map((filter) => {
            if(filter.filterName === 'amount'){
                minMaxAmount = filter.values;
            }
        });

        function setAmountValuesToFilter(isMinAmount, value){
            filters.map((filter)=>{
                if(filter.filterName == 'amount'){
                    if(isMinAmount){
                        filter.values[0] = value;
                    }else{
                        filter.values[1] = value;
                    }
                }
            });
        }

        return(
            <>
                <div className="form-group ml-3">
                    <label>Min. Amount</label>
                    <input type="number" className="form-control" id="minAmountInput" onChange={(e)=> setAmountValuesToFilter(true, e.target.value)} name="minAmountInput" defaultValue={minMaxAmount[0]}/>
                </div>
                <div className="form-group ml-3">
                    <label>Max. Amount</label>
                    <input type="number" className="form-control" id="maxAmountInput" onChange={(e)=> setAmountValuesToFilter(false, e.target.value)} name="maxAmountInput" defaultValue={minMaxAmount[1]}/>
                </div>
            </>                 
        );
    }
    
    function blankDOMElement(){
        return (
            <>HELLO
            </>
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
                    })}
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
            Manage Filters for Payments
          </Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <h5 className="text-danger">Filters applied: {props.filtercount}</h5>
            {props.filters.map((filter)=>{
                //for applied filters, show a badge-pill
                if(filter.isSelected){
                    return(
                        <Badge pill variant="warning" key={filter.filterName} className="mb-4 mr-2">{filter.label}: {filter.values.toString()}
                        <span className="show-pointer" data-toggle="tooltip" data-placement="bottom" 
                            title="Remove this filter" onClick={() => props.removeSelectedFilter(filter.filterName)} aria-hidden="true">&nbsp;&nbsp;&times;</span></Badge>
                    );
                }
            })}
            <p>
                Add one or more filters from below to get payments according
                to Payment Date, Amount, Category, Payment Type.
            </p>
            <div>
                <Button variant="warning" className="rounded-button" onClick={props.handleShow}>Add Filter</Button>
                <Button variant="danger" className="rounded-button ml-2" onClick={() => props.removeAllFilters()}>Remove all Filters</Button>
            </div>
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ViewPayments;