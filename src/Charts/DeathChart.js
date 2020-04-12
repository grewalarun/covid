import React, { Component } from "react";
import { Line, Bar, Doughnut} from "react-chartjs-2";

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
  export default DeathChart;