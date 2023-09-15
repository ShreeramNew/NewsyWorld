import React, { useContext,useEffect } from "react";
import Navbar from "./Components/Navbar";
import NewsContainer from "./Components/NewsContainer";
import Category from "./Context/Category";
import LoadingBar from "react-top-loading-bar";
import PROGRESS_CONTEXT_PROVIDER, { progressContext } from "./Context/ProgressContext_Provider";
export default function App() {
   let ProgressContext_Value = useContext(progressContext);
   let showTopLoadBar=ProgressContext_Value[2]
   useEffect(() => {
      setTimeout(() => {
         console.log(showTopLoadBar);
      }, 5000);
   }, [showTopLoadBar]);
   setTimeout(() => {
      console.log(ProgressContext_Value);
   }, 5000);
   return (
      <div>
         <Category>
            <Navbar />
            {showTopLoadBar&& (
               <LoadingBar
                  color="#f11946"
                  progress={ProgressContext_Value[0]}
                  onLoaderFinished={() => ProgressContext_Value[1](10)}
               />
            )}
            <PROGRESS_CONTEXT_PROVIDER>
               <NewsContainer />
            </PROGRESS_CONTEXT_PROVIDER>
         </Category>
      </div>
   );
}
