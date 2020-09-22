import React, { Component } from "react";
import {Doughnut } from "react-chartjs-2";

class ProvPieChart extends Component {
  render() {
    //        const AllStateData = this.props.IndiaData.filter(d => d.statecode!='TT');
    //const AllStateData = this.props.IndiaData;
    const AllStateData = this.props.ProvinceData;

    const labels1 = [];
    let data1 = [];

    AllStateData.map(d => {
      return (labels1.push(d.province),data1.push(d.confirmed))
    });

    const statedata = {
      labels: labels1,
      datasets: [
        {
          label: "Confirmed",
          backgroundColor: [
            "#3087BF",
            "#00A9BD",
            "#EC407A",
            "#FF7043",
            "#9CCC65",
            "#e14f56",
            "#3087BF",
            "#EC407A",
            "#FF7043",
            "#9CCC65",
            "#ff0000",
            "#BF78CB",
          ],
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
          title: {
            display: false,
            text: "Statewise spread",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
        height={350}
      />

      //end Doghnut
    );
  }
}

export default ProvPieChart;
