import React, { Component } from "react";
import "./Styles/NewsContainer.css";
import NewsItem from "./NewsItem";
import { CategoryContext } from "../Context/Category";
import LoadingBox from "./LoadingBox";
import NoPhoto from "./Images/No-image.svg";
import ErrorHandle from "./ErrorHandle";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from 'uuid';
export default class NewsContainer extends Component {
   constructor(props) {
      super(props);
      this.APIKEY = "71644c4380474bbc8d9d0ced6277a251";
      this.state = {
         totalResults: 0,
         articles: [
            {
               title: "Loading..",
               urlToImage: "Loading..",
               url: "Loading..",
               description: "Loading",
            },
         ],
         hasMore: false,
         latestContext: ["general", null, "us", null],
         currentPage: 1,
         loading: true,
         errorOccured: false,
      };
   }

   static contextType = CategoryContext; //set context

   //To fetctch the url
   fetchUrl = async () => {
      let link = ` https://newsapi.org/v2/top-headlines?country=${this.state.latestContext[2]}&category=${this.state.latestContext[0]}&page=${this.state.currentPage}&apiKey=${this.APIKEY}`;
      let url = new Request(link);
      let tempResponse;
      try {
         tempResponse = await (await fetch(url)).json();
         this.setState(() => {
            let availablePages = Math.ceil(tempResponse.totalResults / 20);
            const updatedArray = tempResponse.articles.filter(
               (item) => !this.state.articles.some((eachArticle) => eachArticle.url === item.url)
            );
            return {
               totalResults: tempResponse.totalResults,
               articles: this.state.articles.concat(updatedArray),
               hasMore: this.state.currentPage < availablePages ? true : false,
            };
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
               articles: [],
               loading: false,
               currentPage: 1,
            },
            this.fetchUrl
         );
      }
   }

   //This function called by <InfiniteScroll/>, when page scrolled further
   handleScroll = () => {
      console.log("Iam Handle scroll");
      this.setState(
         {
            currentPage: this.state.currentPage + 1,
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
            {!this.state.loading && !this.state.errorOccured && <h1 className="genre-title"> {modeifiedTitle}</h1>}
            {!this.state.loading && !this.state.errorOccured && (
               <div className="results-of-fetch">
                  <InfiniteScroll
                     className="results-of-fetch"
                     dataLength={this.state.articles.length}
                     next={this.handleScroll}
                     hasMore={this.state.hasMore}
                     loader={<LoadingBox />}
                  >
                     {this.state.articles.map((article) => {
                        const uniqueId=uuidv4();
                        return (
                           <NewsItem
                              title={article.title}
                              image={article.urlToImage !== null ? article.urlToImage : NoPhoto}
                              readMore={article.url}
                              description={article.description}
                              key={uniqueId}
                           />
                        );
                     })}
                  </InfiniteScroll>
               </div>
            )}
         </div>
      );
   }
}
