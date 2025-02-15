import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail, { productLoader } from "./pages/ProductDetail";

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/product/:id"
            element={<ProductDetail/>}
            loader={productLoader}
          />
        </Routes>
      </Router>
  );
}

export default App;
