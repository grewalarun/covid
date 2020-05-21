import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowUp } from "react-bootstrap-icons";
import axios from "axios";
import Chart from "../Charts/Chart";
import StateChart from "../Charts/StateChart";
import DeathChart from "../Charts/DeathChart";
import IndiaStat from "../Charts/IndiaStat";
import Statewise from "../Components/Statewise";

class India extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      cases: [],
      timeseries: [],
    };
  }

  componentDidMount() {
    document.title = "Corona Tracker";
    const apiUrl = "https://api.covid19india.org/data.json";

    //fetch(apiUrl)

    axios
      .get(apiUrl)

      .then(
        (res) => {
          this.setState({
            cases: res.data.statewise,
            timeseries: res.data.cases_time_series,
            isLoading: false,
            active: res.data.statewise[0].active,
            recovered: res.data.statewise[0].recovered,
            deaths: res.data.statewise[0].deaths,
            statename: res.data.statewise[0].state
          });
          console.log("Success");
        },

        (error) => {
          this.setState({ error });
          console.log("Error Occured" + error);
        }
      );
  }

  handler = (a,b,c,d) => {
    this.setState({
      active: a,
      recovered: b,
      deaths: c,
      statename: d
    })
  }


  render() {
    const { isLoading } = this.state;
    const totalIndia = this.state.cases.filter((d) => d.statecode === "TT");
 

    return (
      <div>
        <h2 className="heading2">INDIA</h2>
        {!isLoading ? (
          <React.Fragment>
            <div className="flaotingBlocks">
              <div className="block blue">
                <h3>
                  {totalIndia[0].confirmed}
                  <small className="red">
                    <ArrowUp color="red" size={25} />
                    {totalIndia[0].deltaconfirmed}
                  </small>
                </h3>
                <p>Total Confirmed</p>
              </div>
              <div className="block red">
                <h3>{totalIndia[0].active}</h3>
                <p>Total Active</p>
              </div>
              <div className="block green">
                <h3>
                  {totalIndia[0].recovered}
                  <small className="green">
                    <ArrowUp color="green" size={25} />
                    {totalIndia[0].deltarecovered}
                  </small>
                </h3>
                <p>Total Recovered</p>
              </div>
              <div className="block grey">
                <h3>
                  {totalIndia[0].deaths}
                  <small className="red">
                    <ArrowUp color="red" size={25} />
                    {totalIndia[0].deltadeaths}
                  </small>
                </h3>
                <p>Total Deceased</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Chart DailyData={this.state.timeseries} />
              </div>
              <div className="col-lg-6">
                <DeathChart StateData={this.state.cases} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Statewise StateData={this.state.cases} handler = {this.handler} />
              </div>
              <div className="col-lg-6">
                <div className="stickydiv">
        <h4 className="py-3 heading4">{this.state.statename} Active vs Recovered</h4>
        <div className="chart-container">
                <IndiaStat Act={this.state.active} Rcvd={this.state.recovered} Dths={this.state.deaths} />
</div>
                <h4 className="mt-4 py-3 heading4">Statewise Spread Chart</h4>
                <div className="chart-container1">
                <StateChart StateData={this.state.cases} />
                </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <h3>Loading....</h3>
        )}
      </div>
    );
  }
}

export default India;
