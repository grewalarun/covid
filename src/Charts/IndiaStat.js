import React, { Component } from "react";
import { Doughnut} from "react-chartjs-2";

class IndiaStat extends Component {

    render() {
      //        const AllStateData = this.props.IndiaData.filter(d => d.statecode!='TT');
      //const AllStateData = this.props.IndiaData;
      const act = this.props.Act;
      const rcvd = this.props.Rcvd;
      const dths = this.props.Dths;
  
       const labels1=["Active","Recovered","Deaths"];
       const data1 = [act,rcvd, dths] 
      const statedata = {
        labels: labels1,
        datasets: [
          {
            label: "Confirmed",
            backgroundColor: ["#e14f56","#61bf53","#3387bf", "#ad7da0","#1cf235","#30be51", "#bfb041", "#e14f56","#3087BF","#FFCA28","#00A9BD","#EC407A","#FF7043","#9CCC65","#BF78CB","#8E8E8E" ],
            borderColor: "rgba(255,255,192,1)",
            borderWidth: 1,
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
            fontSize:20,
          },
          legend:{
            display:true,
            position:'bottom'
          }
        }}
        height={350}
      />
  
        //end Doghnut
      );
    }
  }

  export default IndiaStat;
