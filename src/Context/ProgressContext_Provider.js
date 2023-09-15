import React, { useEffect, useState } from "react";
export const progressContext = React.createContext();
export default function PROGRESS_CONTEXT_PROVIDER(props) {
   const [progressValue, setProgressValue] = useState(10);
   const [showTopLoadBar,setShowTopLoadBar] = useState(false);

   const setProgressState = (value) => {
      setProgressValue(value);
   };
   const handleShowTopLoadBar=(value)=>{
      setTimeout(() => {
          setShowTopLoadBar(value)
      }, 5000);
     
   }

   return (
      <progressContext.Provider value={[progressValue, setProgressState,showTopLoadBar,handleShowTopLoadBar]}>
         {props.children}
      </progressContext.Provider>
   );
}
