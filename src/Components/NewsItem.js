import React, { Component } from "react";
import "./Styles/NewsItem.css";
import LoadingBox from "./LoadingBox";
import LoadGif from "./Images/ImageLoading.gif"
export default class NewsItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         imageLoaded: false,
      };
   }
   handleImageLoad = () => {
      this.setState({
         imageLoaded: true,
      });
   };

   render() {
      let { title, image, description, readMore } = this.props;
      return (
         <div className="news-item-container">
            <h3 id="title">{title}</h3>
            <img
               id="news-image "
               src={this.state.imageLoaded?image:LoadGif}
               style={{
                  height: "200px",
                  width: "200px",
               }}
               alt="NewsImage"
               onLoad={this.handleImageLoad}
            />
            <p id="news-description">{description}</p>
            <a id="read-more" href={readMore}>
               Read More
            </a>
         </div>
      );
   }
}
