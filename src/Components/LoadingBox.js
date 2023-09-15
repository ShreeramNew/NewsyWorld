import loading from "./Images/loadingWhite.gif";
export default function LoadingBox() {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <img src={loading} alt="Loging" />
         <h3
            style={{
               color: "white",
            }}
         >
            Loading...
         </h3>
      </div>
   );
}
