import hourglass from "./Images/Hourglass.gif";
export default function ErrorHandle() {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
         }}
      >
         <img src={hourglass} alt="Error" />
         <h3 style={{ color: "white" }}>
            Something Went Wrong!! <br /> Please check your network connection or try Again Later
         </h3>
      </div>
   );
}
