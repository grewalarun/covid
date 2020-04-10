import React, { Component } from 'react';
import './App.css';
//import Person from './Person/Person';
import India from './India/India';
import Districtwise from './Districtwise/Districtwise';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

class App extends Component {
  render(){
  return (
<Router>

<div className="App">
  <div className="App-header">
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Corona Tracker</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/Districtwise">District wise</Nav.Link>
      <Nav.Link href="/faq">FAQ</Nav.Link>
    </Nav>

  </Navbar.Collapse>
</Navbar>
      </div>
<div className="container-fluid dark">
<Route path="/" exact strict component={India}/>
<Route path="/Districtwise" exact strict component={Districtwise}/>

  </div>    
  
    </div>
</Router>


  );
}
}
export default App;
