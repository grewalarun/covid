import React, { Component } from "react";
import {Line} from "react-chartjs-2";

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
  
      DailyData.map=(d) => {
      labels1.push(d.date); data1.push(d.dailyconfirmed);
      };
  
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
  
  export default Chart;