import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Med Shop Info */}
          <div>
            <h2 className="text-xl font-bold text-pink-600">Med <span className="text-black">Cart</span></h2>
            <p className="mt-2"><strong>Hotline:</strong> 01234</p>
            <p><strong>Phone:</strong> (+123) 456-7898</p>
            <p><strong>Email:</strong> info@gmail.com</p>
            <p><strong>Address:</strong> 2190 Clue, The Xronz, OZ 0038, USA</p>
            <div className="flex justify-center md:justify-start gap-3 mt-4 text-xl">
              <a href="#" className="text-gray-600 hover:text-pink-600"><i className="fab fa-rss"></i></a>
              <a href="#" className="text-gray-600 hover:text-blue-600"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-600 hover:text-blue-600"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-600 hover:text-pink-600"><i className="fab fa-google"></i></a>
              <a href="#" className="text-gray-600 hover:text-blue-600"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-600">About Us</a></li>
              <li><a href="#" className="hover:text-pink-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-600">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-pink-600">Delivery Information</a></li>
              <li><a href="#" className="hover:text-pink-600">Orders and Returns</a></li>
            </ul>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Customer Care</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-600">Help & FAQs</a></li>
              <li><a href="#" className="hover:text-pink-600">My Account</a></li>
              <li><a href="#" className="hover:text-pink-600">Order History</a></li>
              <li><a href="#" className="hover:text-pink-600">Wishlist</a></li>
              <li><a href="#" className="hover:text-pink-600">Newsletter</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Newsletter</h3>
            <p>Sign up for our mailing list to get the latest updates & offers.</p>
            <div className="mt-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="mt-3 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 MedCart. All Rights Reserved 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
