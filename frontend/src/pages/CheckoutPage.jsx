import React from 'react';
import img from '../assets/images/img.png';

const CheckoutPage = () => {
    return (
        <main className="flex items-center justify-center min-h-screen bg-pink-50 px-4">
            <section className="max-w-lg w-full text-center">
                <h2 className="text-3xl font-bold mb-6 text-pink-600 sm:text-4xl">Order Verification</h2>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-72">
                    <img
                        src={img}
                        alt="Order Verification"
                        className="w-16 h-16 mb-4 animate-bounce"
                    />
                    <p className="text-lg mb-2 text-gray-700">Your order has been submitted for verification!</p>
                    <p className="text-lg mb-4 text-gray-600">Please wait for a few minutes and check your profile for updates.</p>
                    <a href="/" className="bg-pink-500 text-white py-2 px-6 rounded-lg font-semibold mt-4 hover:bg-pink-600 transition duration-300">
                        Go to Home
                    </a>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPage;
