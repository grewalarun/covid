import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { ArrowUp } from "react-bootstrap-icons";
import axios from "axios";
import { Line, Bar, Doughnut} from "react-chartjs-2";


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
    document.title = 'Corona Tracker';
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
          });
          console.log("Success");
        },

        (error) => {
          this.setState({ error });
          console.log("Error Occured" + error);
        }
      );
  }

  render() {
    const { isLoading} = this.state;
    const totalIndia = this.state.cases.filter((d) => d.statecode === "TT");
    return (
      <div>
        <h2>INDIA</h2>
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
                <DeathChart StateData={this.state.cases}/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                <Statewise StateData={this.state.cases} />
                </div>
                <div className="col-lg-6">
                <h4 className="p-5">Statewise Spread Chart</h4>
                    <StateChart StateData={this.state.cases}/>
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

class Chart extends Component {
  constructor(props) {
    super(props);
    this.setstate = {
      isLoading: true,
    };
  }

  render() {
    //componentDidUpdate()
    //        const AllStateData = this.props.IndiaData.filter(d => d.statecode!='TT');
    //const AllStateData = this.props.IndiaData;
    const DailyData = this.props.DailyData.slice(
      Math.max(this.props.DailyData.length - 21, 0)
    );

    const labels1 = [];
    let data1 = [];

    DailyData.map((d) => {
    labels1.push(d.date); data1.push(d.dailyconfirmed);
    });

    const state1 = {
      labels: labels1,
      datasets: [
        {
          label: "Confirmed",
          backgroundColor: "rgba(75,1,192,0.8)",
          borderColor: "rgba(75,10,192,1)",
          borderWidth: 2,
          data: data1,
        },
      ],
    };

    return (
      <Line
        data={state1}
        options={
          {
          title: {
            display: true,
            text: "Last 21 days trend of daily cases",
            fontSize: 15,
          },
          responsive : true,
          legend: {
            display: false,
            position: "right",
          },
        }}
        height={200}
        
      />

    );
  }
}

//Dohgnut Chart

class StateChart extends Component {

    render() {
      //        const AllStateData = this.props.IndiaData.filter(d => d.statecode!='TT');
      //const AllStateData = this.props.IndiaData;
      const AllStateData = this.props.StateData.filter(d => d.statecode!='TT').slice(0,22);
  
      const labels1 = [];
      let data1 = [];
  
      AllStateData.map((d) => {
      labels1.push(d.state); data1.push(d.confirmed);
      });
  
      const statedata = {
        labels: labels1,
        datasets: [
          {
            label: "Confirmed",
            backgroundColor: ["#e14f56","#3087BF","#FFCA28","#00A9BD","#EC407A","#FF7043","#9CCC65","#BF78CB","#8E8E8E", "#ad7da0","#1cf235","#30be51", "#bfb041", "#e14f56","#3087BF","#FFCA28","#00A9BD","#EC407A","#FF7043","#9CCC65","#BF78CB","#8E8E8E" ],
            borderColor: "rgba(75,10,192,1)",
            borderWidth: 0,
            data: data1,
          },
        ],
      };
  
      return (
        <Doughnut
        data={statedata}
        options={{
          title:{
            display:false,
            text:'Statewise spread',
            fontSize:20
          },
          legend:{
            display:true,
            position:'bottom'
          }
        }}
        height={200}
      />
  
        //end Doghnut
      );
    }
  }

//END

//Dohgnut Chart

class DeathChart extends Component {

  render() {
    //        const AllStateData = this.props.IndiaData.filter(d => d.statecode!='TT');
    //const AllStateData = this.props.IndiaData;
    const AllStateData = this.props.StateData.filter(d => d.statecode!='TT' && d.deaths>0);

    const labels1 = [];
    let data1 = [];

    AllStateData.map((d) => {
    labels1.push(d.state); data1.push(d.deaths);
    });

    const statedata = {
      labels: labels1,
      datasets: [
        {
          label: "Death",
          backgroundColor: ["#e14f56","#3087BF","#FFCA28","#00A9BD","#EC407A","#FF7043","#9CCC65","#BF78CB","#8E8E8E", "#ad7da0","#1cf235","#30be51", "#bfb041", "#e14f56","#3087BF","#FFCA28","#00A9BD","#EC407A","#FF7043","#9CCC65","#BF78CB","#8E8E8E" ],
          borderColor: "rgba(75,10,192,1)",
          borderWidth: 0,
          data: data1,
        },
      ],
    };

    return (
      <Bar
      data={statedata}
      options={{
        title:{
          display:true,
          text:'Total Death Statewise',
          fontSize:15
        },
        legend:{
          display:false,
          position:'bottom'
        }
      }}
      height={200}
    />

      //end Doghnut
    );
  }
}

//END


class Statewise extends Component {
  render() {
    const AllStateData = this.props.StateData.filter(
      (d) => d.statecode !== "TT"
    );
    return (
        <React.Fragment>
    <h4 className="p-5">Statewise Data Updated at {this.props.StateData[0].lastupdatedtime}</h4>
      <Table striped bordered hover variant="dark">
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
              <td>{d.state}</td>
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

export default India;
