import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import CanadaMain from "./CanadaMain";
import ProvPieChart from "./ProvPieChart";

class Canada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: "",
      Canada: [],
      IsLoading: true,
    };
  }
  componentDidMount() {
    document.title = "Canada Corona Tracker";
    axios({
      method: "GET",
      url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "0c3812ba95msh17c9947266672ddp16f018jsn0289a3c20744",
      },
      params: {
        country: "Canada",
      },
    })
      .then((response) => {
        this.setState({
          updated: response.data.data.lastChecked,
          Canada: response.data.data.covid19Stats,
          IsLoading: false,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const Canada = this.state.Canada.filter((c) => c.confirmed != 0);
    const IsLoading = this.state.IsLoading;
    return !IsLoading ? (
      <React.Fragment>
        <CanadaMain />
        <div className="row">
          <div className="col-lg-6">
            <h4 className="py-3 heading4">
              Province Data <small>Updated at {this.state.updated}</small>
            </h4>
            <Table striped responsive bordered hover className="statecases">
              <thead>
                <tr>
                  <th>Province</th>
                  <th>Confirmed</th>
                  <th>Recovered</th>
                  <th>Deaths</th>
                </tr>
              </thead>
              <tbody>
                {Canada.map((d) => (
                  <tr>
                    <td>{d.province}</td>
                    <td>{d.confirmed}</td>
                    <td>{d.recovered}</td>
                    <td>{d.deaths}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-lg-6">
          <h4 className="py-3 heading4">Province wise Spread Chart</h4>
            <ProvPieChart ProvinceData={Canada} />
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div className="dataloader"><h3>Loading Data...</h3></div>
    );
  }
}

export default Canada;
