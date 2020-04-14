import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowUp } from "react-bootstrap-icons";
import axios from "axios";

class CanadaMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      TotalCanada: [],
    };
  }

  componentDidMount() {
    document.title = "Worldwide Corona Tracker";
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "0c3812ba95msh17c9947266672ddp16f018jsn0289a3c20744",
      },
    })
      .then((response) => {
        this.setState({
          updated: response.data.statistic_taken_at,
          TotalCanada: response.data.countries_stat,
          isLoading: false,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { isLoading } = this.state;
    const TotalCanada = this.state.TotalCanada.filter(
      (d) => d.country_name === "Canada"
    );
    return (
      <div>
        <h2 className="heading2">Canada</h2>
        {!isLoading ? (
          <React.Fragment>
            <div className="flaotingBlocks">
              <div className="block blue">
                <h3>
                  {TotalCanada[0].cases}
                  <small className="red">
                    <ArrowUp color="red" size={25} />
                    {TotalCanada[0].new_cases}
                  </small>
                </h3>
                <p>Total Confirmed</p>
              </div>
              <div className="block red">
                <h3>{TotalCanada[0].active_cases}</h3>
                <p>Total Active</p>
              </div>
              <div className="block green">
                <h3>{TotalCanada[0].total_recovered}</h3>
                <p>Total Recovered</p>
              </div>
              <div className="block grey">
                <h3>
                  {TotalCanada[0].deaths}
                  <small className="red">
                    <ArrowUp color="red" size={25} />
                    {TotalCanada[0].new_deaths}
                  </small>
                </h3>
                <p>Total Deceased</p>
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

export default CanadaMain;
