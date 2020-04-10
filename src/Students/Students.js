import React, { Component } from 'react';
//import  myStyle from './Students.module.css'
import mycss from 'styled-components'


const MyDiv = mycss.div`
  background: #d2f5f5;
  border-radius: 3px;
  border: 1px solid palevioletred;
  margin: 1em;
  padding: 0.25em 1em;
  box-shadow: 1px 1px 2px #000;
  &:hover {
      background-color: red;
      transition: 0.5s all;
  }
`

class Students extends Component {
    state = {
        studentList:[
            {name: "Arun", age: 27},
            {name: "Pankaj", age: 23},
            {name: "Sumit",age: 26},
            {name: "Vikram",age: 25}
        ]
    }


    render(){
    
        return(
            <>
            {
            this.state.studentList.map((d)=>{
                return(
                <MyDiv>
                <h1>Hi, My Name is {d.name}</h1>
                <h2>My Age is - {d.age}</h2>
                </MyDiv>
                )
            })

            }
            </>    
                 
            

        );
    }
}

export default Students;