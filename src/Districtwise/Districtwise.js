import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./District.css";
import { ArrowUp } from "react-bootstrap-icons";
import { Table } from "react-bootstrap";
import axios from "axios";

// import { Container } from './styles';

class Districtwise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      district: [],
      states: [],
      allowed : ["Andaman and Nicobar Islands"]
    };
  }

  componentDidMount() {
    document.title = 'Districtwise || State / District wise Covid Data';
    const apiUrl = "https://api.covid19india.org/data.json";
    const dist_apiUrl = "https://api.covid19india.org/state_district_wise.json";

    //fetch(apiUrl)

    function dataApi() {
      return axios.get(apiUrl);
    }
    function distApi() {
      return axios.get(dist_apiUrl);
    }
    axios
      .all([dataApi(), distApi()])

      .then((res) => {
        //this will be executed only when all requests are complete
        this.setState({
          states: res[0].data.statewise,
          district: res[1].data,
          isLoading: false,
        });
      });
 }

  handleClick = (az) => {
   this.setState({
     allowed: az
   })
    
  };

  render() {
    let districts1 = this.state.district;
    //    let ss =Object.keys(districts1);
    let st = Object.keys(districts1)
    let ss = Object.keys(districts1).filter(key => this.state.allowed.includes(key));
    const StateData = this.state.states.filter(d => d.state==this.state.allowed);
    return (
      
        <div className="row">
          <div className="col-lg-6">
        <ul className="statelist">
          {st.sort((a, b) => a.localeCompare(b)).map((d, i) => 
          (<li key={i} onClick={()=>this.handleClick(d)}>{d}</li>)
          )}
</ul>

          </div>
          <div className="col-lg-6">
            <h2>{this.state.allowed}</h2>
          {StateData.map((d) => (<React.Fragment>
            <div className="flaotingBlocks">
              <div className="block blue">
                <h3>
                  {d.confirmed}
                  <small className="red">
                    <ArrowUp color="red" size={25} />
                    {d.deltaconfirmed}
                  </small>
                </h3>
                <p>Total Confirmed</p>
              </div>
              <div className="block red">
                <h3>{d.active}</h3>
                <p>Total Active</p>
              </div>
              <div className="block green">
                <h3>
                  {d.recovered}
                  <small className="green">
                    <ArrowUp color="green" size={25} />
                    {d.deltarecovered}
                  </small>
                </h3>
                <p>Total Recovered</p>
              </div>
              <div className="block grey">
                <h3>
                  {d.deaths}
                  <small className="red">
                    <ArrowUp color="red" size={25} />
                    {d.deltadeaths}
                  </small>
                </h3>
                <p>Total Deceased</p>
              </div>
            </div>
          </React.Fragment>))}
         
            {ss.map((d, i) => (
              <div key={i}>
                <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>District</th>
            <th>Total Confirmed</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(districts1[d].districtData).map((f, g) => (
           
          <tr key={g}>
            <td className="text-left px-3">{f}</td>
            <td>{districts1[d].districtData[f].confirmed}</td>
            </tr>
           
          ))}
           </tbody>
       </Table>




              </div>
            ))}
          </div>
        </div>
      
    );
  }
}

class Zila extends Component {
  render() {
    return;
    //dist.map((d,i) => (<p>{i}</p>))
  }
}

export default Districtwise;
