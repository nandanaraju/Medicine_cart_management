import React from "react";
import medicineImage from "../assets/images/medi.jpg"; // Use the actual image URL or import it
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
     <section className="bg-gray-100 text-gray-800 py-16 px-6 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-4xl font-extrabold text-pink-600 leading-tight mb-6">
          Your Trusted Healthcare Partner – <br /> <span className="text-gray-900"> MedCart
</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            At MedCart, your health and well-being are our top priorities. We are committed to providing top-quality pharmaceutical care, excellent customer service, and a vast selection of healthcare products.
          </p>
          <Link to="/products" className="bg-pink-600 text-white px-6 py-3  text-lg font-semibold shadow-md hover:bg-pink-700 transition duration-300">
            Explore Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={medicineImage}
              alt="Pharmacy Products"
              className="w-[320px] h-[320px] md:w-[350px] md:h-[350px] object-cover"
            />
          </div>
        </div>
        
      </div>
    </section>
       
            <section className="bg-gray-100 py-6">
            <h2 className="text-center text-3xl font-bold mb-8">Why We're the Best Choice?
</h2>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {/* Free Shipping */}
          <div className="flex flex-col items-center">
            <i className="fas fa-truck text-3xl text-pink-500"></i>
            <h3 className="font-semibold text-lg mt-2">Free Shipping</h3>
            <p className="text-gray-500 text-sm">Free shipping worldwide</p>
          </div>

          {/* Support 24/7 */}
          <div className="flex flex-col items-center">
            <i className="fas fa-headset text-3xl text-pink-500"></i>
            <h3 className="font-semibold text-lg mt-2">Support 24/7</h3>
            <p className="text-gray-500 text-sm">Contact us 24 hours a day</p>
          </div>

          {/* Secure Payments */}
          <div className="flex flex-col items-center">
            <i className="fas fa-credit-card text-3xl text-pink-500"></i>
            <h3 className="font-semibold text-lg mt-2">Secure Payments</h3>
            <p className="text-gray-500 text-sm">100% payment protection</p>
          </div>

          {/* Easy Return */}
          <div className="flex flex-col items-center">
            <i className="fas fa-shopping-cart text-3xl text-pink-500"></i>
            <h3 className="font-semibold text-lg mt-2">Easy Return</h3>
            <p className="text-gray-500 text-sm">Simple returns policy</p>
          </div>
        </div>
      </div>
    </section>
            <Footer/>
    </>
  );
};

export default Home;
