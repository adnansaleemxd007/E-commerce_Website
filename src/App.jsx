import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Footer from "./Footer";


const App = () => {
  return(
    <> 
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="fixed w-full z-50">
          <Navbar />
        </div>

        <div className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
