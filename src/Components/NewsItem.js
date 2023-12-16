import React, { useState } from "react";
import "./Styles/NewsItem.css";
import LoadGif from "./Images/ImageLoading.gif";
export default function NewsItem(props) {
   const [imageLoaded, setImageLoaded] = useState(false);

   const handleImageLoad = () => {
      setImageLoaded(true);
   };

   let { title, image, description, readMore } = props;
   return (
      <div className="news-item-container">
         <h3 id="title">{title}</h3>
         <img
            id="news-image "
            src={imageLoaded ? image : LoadGif}
            style={{
               height: "200px",
               width: "200px",
            }}
            alt="NewsImage"
            onLoad={handleImageLoad}
         />
         <p id="news-description">{description}</p>
         <a id="read-more" href={readMore}>
            Read More
         </a>
      </div>
   );
}
