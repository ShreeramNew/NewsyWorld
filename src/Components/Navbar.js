import React, { Component } from "react";
import "./Styles/Navbar.css";
import DropDownCategory from "./DropDownCategory";
import DropDownCountry from "./DropDownCountry"
import logo from "./Images/NewsWorldEditedLogo.png"

export default class Navbar extends Component {
   render() {
      return (
         <>
            <div className="nav-container">
               <div className="left-container">
                  <img src={logo} alt="logo" className="logo" />
                  <h3 className="logo__title">NewsyWorld</h3>
               </div>
               <div className="right-container">
                  <nav id="real-nav">
                     <a className="link" href="/">
                        Home
                     </a>
                         <DropDownCountry/>
                        <DropDownCategory />
                     <a className="link" href="/">
                        About Us
                     </a>
                  </nav>
               </div>
            </div>
         </>
      );
   }
}
