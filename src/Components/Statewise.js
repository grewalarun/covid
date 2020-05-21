import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { ArrowUp } from "react-bootstrap-icons";
import {BrowserRouter as Router, Route,Switch, Link} from "react-router-dom";

class Statewise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aa :"lalala"
  }
}
    render() {
      const AllStateData = this.props.StateData.filter(
        (d) => d.statecode !== "TT"
      );
      return (
          <React.Fragment>
      <h4 className="py-3 heading4">Statewise Data Updated at {this.props.StateData[0].lastupdatedtime}</h4>
        <Table striped responsive bordered hover className="statecases">
          <thead>
            <tr>
              <th>State</th>
              <th>Total Confirmed</th>
              <th>Active</th>
              <th>Recoverd</th>
              <th>Deaths</th>
            </tr>
          </thead>
          <tbody>
            {AllStateData.map((d) => (
              <tr className={d.deltaconfirmed != 0 ? ("warning"):("")}>
                <td onMouseOver = {() => this.props.handler(d.active,d.recovered,d.deaths, d.state)}>{(d.state!="State Unassigned")?<Link to={{pathname:'/Districtwise',state:d.state}}>{d.state}</Link>:"States Unassigned "}</td>
                <td>
                  {d.confirmed}
                  {d.deltaconfirmed != 0 ? (
                    <small className="red">
                      <ArrowUp color="red" size={25} />
                      {d.deltaconfirmed}
                    </small>
                  ) : (
                    ""
                  )}
                </td>
                <td>{d.active}</td>
                <td>
                  {d.recovered}
                  {d.deltarecovered != 0 ? (
                    <small className="green">
                      <ArrowUp color="green" size={25} />
                      {d.deltarecovered}
                    </small>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {d.deaths}
                  {d.deltadeaths != 0 ? (
                    <small className="red">
                      <ArrowUp color="red" size={25} />
                      {d.deltadeaths}
                    </small>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </React.Fragment>
      );
    }
  }

  export default Statewise;