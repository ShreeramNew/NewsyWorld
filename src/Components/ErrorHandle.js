import React, { Component } from "react";
import hourglass from "./Images/Hourglass.gif";
export default class ErrorHandle extends Component {
   render() {
      return (
         <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center"
         }}>
            <img src={hourglass} alt="Error" />
            <h3>
               Something Went Wrong!! <br /> Please check your network connection or try Again Later
            </h3>
         </div>
      );
   }
}
