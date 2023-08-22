import React, { Component } from "react";
import "./Styles/NewsContainer.css";
import NewsItem from "./NewsItem";
import { CategoryContext } from "../Context/Category";
import LoadingBox from "./LoadingBox";
import NoPhoto from "./Images/No-image.svg";
import ErrorHandle from "./ErrorHandle";

export default class NewsContainer extends Component {
   constructor(props) {
      super(props);
      this.APIKEY = "71644c4380474bbc8d9d0ced6277a251";
      this.state = {
         response: {
            articles: [
               {
                  title: "Loading..",
                  urlToImage: "Loading..",
                  url: "Loading..",
                  description: "Loading",
               },
            ],
         },
         latestContext: ["general", null, "us", null],
         availablePages: 1,
         currentPage: 1,
         showNextButton: false,
         showPrevButton: false,
         loading: false,
         errorOccured: false,
      };
   }

   static contextType = CategoryContext; //set context

   //To fetctch the url
   fetchUrl = async () => {
      console.log(this.value);
      let link = ` https://newsapi.org/v2/top-headlines?country=${this.state.latestContext[2]}&category=${this.state.latestContext[0]}&page=${this.state.currentPage}&apiKey=${this.APIKEY}`;
      let url = new Request(link);
      console.log(link);
      let tempResponse;
      try {
         this.setState({ loading: true });
         tempResponse = await (await fetch(url)).json();
         let availablePages = Math.ceil(tempResponse.totalResults / 20);
         this.setState({
            response: tempResponse,
            loading: false,
            showNextButton: this.state.currentPage < availablePages ? true : false,
            showPrevButton: this.state.currentPage > 1 ? true : false,
         });
      } catch (error) {
         console.log(error);
         this.setState({
            errorOccured: true,
            loading: false,
         });
      }
   };

   // update link immediately after mounting
   componentDidMount() {
      this.fetchUrl(); //Fetch the newly created link
   }

   //Re-render ony when context(it contains category and a function to change it) value changed
   componentDidUpdate() {
      if (this.context !== this.state.latestContext) {
         this.setState(
            {
               latestContext: this.context,
            },
            this.fetchUrl
         );
      }
   }

   //Function to show next Page
   handleNext = () => {
      this.setState(
         {
            currentPage: this.state.currentPage + 1,
         },
         this.fetchUrl
      );
   };

   //Function to show previous Page
   handlePrev = () => {
      this.setState(
         {
            currentPage: this.state.currentPage - 1,
         },
         this.fetchUrl
      );
   };

   //Render method
   render() {
      let title = this.state.latestContext[0];
      let modeifiedTitle = title.replace(title.charAt(0), title.charAt(0).toUpperCase());
      return (
         <div className="news-container">
            {this.state.loading && <LoadingBox />}
            {this.state.errorOccured && <ErrorHandle />}
            {!this.state.loading && !this.state.errorOccured && <h1> {modeifiedTitle}</h1>}
            <div className="results-of-fetch">
               {!this.state.loading &&!this.state.errorOccured && 
                  this.state.response.articles.map((article) => {
                     return (
                        <NewsItem
                           title={article.title}
                           image={article.urlToImage !== null ? article.urlToImage : NoPhoto}
                           readMore={article.url}
                           description={article.description}
                           key={article.url}
                        />
                     );
                  })}
               {!this.state.loading && !this.state.errorOccured&&(
                  <div
                     className="buttons-container"
                     style={{
                        display: "flex",
                        width: "400px",
                     }}
                  >
                     {this.state.showPrevButton && (
                        <button className="next__prev__button" onClick={this.handlePrev}>
                           &larr; Previous
                        </button>
                     )}
                     {this.state.showNextButton && (
                        <button
                           className="next__prev__button"
                           onClick={this.handleNext}
                           style={{
                              marginLeft: "auto",
                           }}
                        >
                           Next &rarr;
                        </button>
                     )}
                  </div>
               )}
            </div>
         </div>
      );
   }
}
