import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from 'axios';



class Person extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      products: []
    }
  }

componentDidMount(){

    const apiUrl = 'https://api.covid19india.org/data.json';

    //fetch(apiUrl)

axios.get(apiUrl)

.then((res) => {
  this.setState({
    products: res.data.cases_time_series,
    isLoading: false
  })
  console.log("Success");
  },

        (error) => {
          this.setState({ error });
          console.log("Error Occured"+ error);
        }
      )
  }
  // axios.get('https://api.github.com/users/mapbox')
  // .then((response) => {
  //   return(response.data);
  // //<h1>{this.Data}</h1>
  //   // console.log(response.data);
  //   // console.log(response.status);
  //   // console.log(response.statusText);
  //   // console.log(response.headers);
  //   // console.log(response.config);
  // });




    render(){
      const { isLoading, error, products} = this.state;
        return (
          <div>
          <h2>Corona Tracker</h2>
          {!isLoading ? (
          <Table>
            <thead>
              <tr>
                <th>Date </th>
                <th>Confirmed</th>
                <th>Death</th>
                <th>Total Confirmed</th>
                <th>Total Death</th>
              </tr>
            </thead>
            <tbody>

             {products.map(d => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>{d.dailyconfirmed}</td>
              <td>{d.dailydeceased}</td>
              <td>{d.totalconfirmed}</td>
              <td>{d.totaldeceased}</td>
                </tr>
              ))}
               
            </tbody>
          </Table>
          ): (
            <h3>Loading...</h3>
          )}
        </div>
       
          );
    }

}
  export default Person;