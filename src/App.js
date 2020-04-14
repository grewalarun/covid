import React, { Component } from 'react';
import './App.css';
//import Person from './Person/Person';
import India from './India/India';
import Districtwise from './Districtwise/Districtwise';
import World from './Components/World/World';
import Canada from './Components/Canada/Canada';
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
      <Nav.Link activeClassName="active" as={Link} to="/">India</Nav.Link>
      <Nav.Link activeClassName="active" as={Link} to="/Canada">Canada</Nav.Link>
      <Nav.Link activeClassName="active" as={Link} to="/World">World</Nav.Link>
     
    </Nav>

  </Navbar>
</Navbar>
      </div>
<div className="container-fluid pt-3">
<Switch>
<Route path="/" exact strict component={India}/>
<Route path="/Districtwise" exact strict component={Districtwise}/>
<Route path="/World" exact strict component={World}/>
<Route path="/Canada" exact strict component={Canada}/>
</Switch>
  </div>    
  
    </div>
</Router>


  );
}
}
export default App;
