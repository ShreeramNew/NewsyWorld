import Navbar from "./Components/Navbar";
import NewsContainer from "./Components/NewsContainer";
import Category from "./Context/Category";
export default function App() {
   return (
      <div>
         <Category>
            <Navbar />
            <NewsContainer />
         </Category>
      </div>
   );
}
