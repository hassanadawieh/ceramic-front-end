import { Route , Routes} from "react-router-dom";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/pages/Home/Home";
import ContactUs from "../src/pages/ContactUs/ContactUs";
import NotFound from "../src/pages/NotFound/NotFound";
import Order from "../src/pages/Order/Order";
import Product from "../src/pages/Product/Product";
import Unauthorized from "../src/pages/Unauthorized/Unauthorized";
import Login from "../src/pages/Login/Login";
import MyContext , { DataProvider} from "./MyContext"
import './App.css';

function App() {

  const CategoryName = "All ctaegories";
  return (
  <DataProvider>
    <div className="App">
      <Header className="header" />
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route path="order" element={<Order />} />
          <Route path="products" element={<Product />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
      <Footer className="footer" />
    </div>
    </DataProvider>
  );
}

export default App;
