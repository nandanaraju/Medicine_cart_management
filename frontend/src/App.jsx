import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail, { productLoader } from "./pages/ProductDetail";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AllCartPage from "./pages/AllCartPage";
import MainLayout from "./layouts/MainLayout";
import Footer from "./components/Footer";

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<AllCartPage />} />
          <Route path="/footer" element={<Footer />} />
          



          <Route
            path="/edit-product/:id"
            element={<EditProductPage />}
            loader={productLoader}
          />

          <Route
            path="/product/:id"
            element={<ProductDetail/>}
            loader={productLoader}
          />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
