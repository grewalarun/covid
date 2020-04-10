import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./District.css";
import { ArrowUp } from "react-bootstrap-icons";

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
      allowed : ["Punjab"]
    };
  }

  componentDidMount() {
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

    console.log("step 1 mount");
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
    let yd = "Kerala";
  
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 col-md-2">
       
          {st.map((d, i) => 
          (<p key={i} onClick={()=>this.handleClick(d)}>{d}</p>)
          )}

            {ss.map((d, i) => {
              console.log(d);
              console.log("-------");
              //console.log(districts1[d].districtData)

              Object.keys(districts1[yd].districtData).map((f) => {
                console.log(f);

                console.log(districts1[yd].districtData[f].confirmed);
              })

              console.log("-------");
            })}
          </div>
          <div className="col-9 col-md-10">
            {ss.map((d, i) => (
              <div key={i}>
                <div className="statename">
                  <h3>{d}</h3>
                </div>
                <div className="districBlock">
                  {Object.keys(districts1[d].districtData).map((f, g) => (
                    <div className="districts" key={g}>
                      <h5>{f}</h5>
                      Confirmed Cases :{districts1[d].districtData[f].confirmed}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
