import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import NewsContainer from "./Components/NewsContainer";
import Category from "./Context/Category";

export default class App extends Component {
   render() {
      return (
         <div>
            <Category>
               <Navbar />
               <NewsContainer />
            </Category>
         </div>
      );
   }
}
