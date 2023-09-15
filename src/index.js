import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PROGRESS_CONTEXT_PROVIDER, { progressContext } from "./Context/ProgressContext_Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <PROGRESS_CONTEXT_PROVIDER>
         <App />
      </PROGRESS_CONTEXT_PROVIDER>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
