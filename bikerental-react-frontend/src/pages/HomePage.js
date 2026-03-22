import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Rent Your Perfect Bike Today</h1>
          <p className="text-xl mb-8">
            Experience the freedom of riding. Affordable, reliable, and convenient bike rentals.
          </p>
          <Link
            to="/bikes"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Explore Bikes <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FiMapPin size={32} />,
                title: 'Wide Selection',
                desc: 'Choose from our diverse fleet of motorcycles'
              },
              {
                icon: <FiDollarSign size={32} />,
                title: 'Affordable Pricing',
                desc: 'Competitive rates for all bike categories'
              },
              {
                icon: <FiTrendingUp size={32} />,
                title: 'Easy Booking',
                desc: 'Simple and secure online reservation system'
              },
              {
                icon: <FiArrowRight size={32} />,
                title: '24/7 Support',
                desc: 'Always here to help with your rental needs'
              },
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 bg-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers and book your bike now.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/bikes"
              className="btn btn-primary bg-white text-blue-600 hover:bg-blue-50"
            >
              Browse Bikes
            </Link>
            <Link
              to="/contact"
              className="btn bg-blue-700 text-white hover:bg-blue-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Bikes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Bikes</h2>
          <div className="text-center text-gray-600">
            <p>Check out our latest bikes collection</p>
            <Link
              to="/bikes"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-bold"
            >
              View All Bikes →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                text: 'Amazing service! The bike was in perfect condition. Highly recommended!',
                rating: 5
              },
              {
                name: 'Jane Smith',
                text: 'Great experience from booking to return. Very professional team.',
                rating: 5
              },
              {
                name: 'Mike Johnson',
                text: 'Affordable and reliable. Will definitely rent again!',
                rating: 5
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="card">
                <div className="mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-bold text-gray-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
