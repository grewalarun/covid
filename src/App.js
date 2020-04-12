import React, { Component } from 'react';
import './App.css';
//import Person from './Person/Person';
import India from './India/India';
import Districtwise from './Districtwise/Districtwise';
import {BrowserRouter as Router, Route,Switch, Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

class App extends Component {
  render(){
  return (
<Router>

<div className="App">
  <div className="App-header">

  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand>Corona Tracker</Navbar.Brand>
  <Navbar id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link  as={Link} to="/">Home</Nav.Link>
      <Nav.Link  as={Link} to="/Districtwise">District wise</Nav.Link>
      <Nav.Link  as={Link} to="/faq">FAQ</Nav.Link>
     
    </Nav>

  </Navbar>
</Navbar>
      </div>
<div className="container-fluid pt-3">
<Switch>
<Route path="/" exact strict component={India}/>
<Route path="/Districtwise" exact strict component={Districtwise}/>
</Switch>
  </div>    
  
    </div>
</Router>


  );
}
}
export default App;
