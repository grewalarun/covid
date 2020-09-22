import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { ArrowUp } from "react-bootstrap-icons";
import axios from "axios";

/*



    */

class world extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: "",
      Countries: [],
      IsLoading: true,
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
          Countries: response.data.countries_stat,
          IsLoading: false,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const Countries = this.state.Countries.filter((c) => c.country_name !== "");
    const IsLoading = this.state.IsLoading;
    return !IsLoading ? (
      <React.Fragment>
        <h3 className="py-3 heading3">Worldwide Data</h3>
        <h4 className="heading4 text-left">
          Total {Countries.length} Countries Effected{" "}
          <small>Updated at {this.state.updated}</small>
        </h4>
        <Table striped responsive bordered hover className="statecases">
          <thead>
            <tr>
              <th>Country</th>
              <th>Cases</th>

              <th>Active Cases</th>
              <th>Recoverd</th>
              <th>Deaths</th>

              <th>Critical</th>
              <th>Cases/1 Million</th>
            </tr>
          </thead>
          <tbody>
            {Countries.map((d) => (
              <tr className={d.new_deaths !== 0 ? "warning" : ""}>
                <td>{d.country_name}</td>
                <td>
                  {d.cases}
                  {d.new_cases !== 0 ? (
                    <small className="red">
                      <ArrowUp color="red" size={25} />
                      {d.new_cases}
                    </small>
                  ) : (
                    ""
                  )}
                </td>
                <td>{d.active_cases}</td>
                <td>{d.total_recovered}</td>
                <td>
                  {d.deaths}
                  {d.new_deaths !== 0 ? (
                    <small className="red">
                      <ArrowUp color="red" size={25} />
                      {d.new_deaths}
                    </small>
                  ) : (
                    ""
                  )}
                </td>
                <td>{d.serious_critical}</td>
                <td>{d.total_cases_per_1m_population}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    ) : (
      <div className="dataloader"><h3>Loading Data...</h3></div>
    );
  }
}

export default world;
