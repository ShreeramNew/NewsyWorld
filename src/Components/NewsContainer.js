import React, { useContext, useEffect, useState } from "react";
import "./Styles/NewsContainer.css";
import NewsItem from "./NewsItem";
import { CategoryContext } from "../Context/Category";
import LoadingBox from "./LoadingBox";
import NoPhoto from "./Images/No-image.svg";
import ErrorHandle from "./ErrorHandle";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";
export default function NewsContainer() {
   //Declarations
   const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
   const [articles, setArticles] = useState([
      {
         title: "Loading..",
         urlToImage: "Loading..",
         url: "Loading..",
         description: "Loading",
      },
   ]);
   const [hasMore, setHasMore] = useState(false);
   const [latestCategoryContext, setLatest_CategoryContext] = useState([
      "general",
      null,
      "us",
      null,
   ]);
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(true);
   const [errorOccured, setErrorOccured] = useState(false);

   let CategoryContext_Value = useContext(CategoryContext);

   //Function To fetch the NewsAPI
   const fetchUrl = async () => {
      let link = ` https://newsapi.org/v2/top-headlines?country=${latestCategoryContext[2]}&category=${latestCategoryContext[0]}&page=${currentPage}&apiKey=${API_KEY}`;
      let url = new Request(link);
      let tempResponse;
      try {
         tempResponse = await (await fetch(url)).json();

         let availablePages = Math.ceil(tempResponse.totalResults / 20);
         const updatedArray = tempResponse.articles.filter(
            (item) => !articles.some((eachArticle) => eachArticle.url === item.url)
         );

         setArticles(articles.concat(updatedArray));
         setHasMore(currentPage < availablePages ? true : false);
      } catch (error) {
         console.log(error);
         setErrorOccured(true);
         setLoading(false);
      }
   };

   //Re-render when CategoryContext_value changed
   useEffect(() => {
      if (CategoryContext_Value !== latestCategoryContext) {
         console.log("CategoryContext", CategoryContext_Value);
         console.log("Latest CategoryContext", latestCategoryContext);
         setArticles([]);
         setLoading(false);
         setCurrentPage(1);
         setLatest_CategoryContext(CategoryContext_Value);
      } else {
         fetchUrl(true);
      }
   }, [CategoryContext_Value, latestCategoryContext]);

   //This function called by <InfiniteScroll/>, when page scrolled further
   const handleScroll = () => {
      setCurrentPage(currentPage + 1);
   };
   useEffect(() => {
      if (currentPage !== 1) {
         fetchUrl();
      }
   }, [currentPage]);

   let title = latestCategoryContext[0];
   let modeifiedTitle = title.replace(title.charAt(0), title.charAt(0).toUpperCase());

   return (
      <div className="news-container">
         {loading && <LoadingBox />}
         {errorOccured && <ErrorHandle />}
         {!loading && !errorOccured && <h1 className="genre-title"> {modeifiedTitle}</h1>}
         {!loading && !errorOccured && (
            <div className="results-of-fetch">
               <InfiniteScroll
                  className="results-of-fetch"
                  dataLength={articles.length}
                  next={handleScroll}
                  hasMore={hasMore}
                  loader={<LoadingBox />}
               >
                  {articles.map((article) => {
                     const uniqueId = uuidv4();
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
