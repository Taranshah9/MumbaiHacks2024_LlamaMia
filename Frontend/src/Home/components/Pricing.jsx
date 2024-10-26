/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PricingTier = ({ title, price, features, isPopular }) => (
  <div
    className={`flex flex-col p-6 mx-4 max-w-lg text-center text-gray-900 bg-white rounded-lg border ${
      isPopular ? 'border-green-500 shadow-lg' : 'border-gray-100'
    } xl:p-8`}
    data-aos="fade-up"
    data-aos-delay="300"
  >
    {isPopular && (
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full uppercase">
        Most popular
      </span>
    )}
    <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
    <div className="flex justify-center items-baseline my-8">
      <span className="mr-2 text-5xl font-extrabold">${price}</span>
      <span className="text-gray-500">/month</span>
    </div>
    <ul className="mb-8 space-y-4 text-left">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
        isPopular
          ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200'
          : 'bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-100'
      }`}
    >
      Get started
    </button>
  </div>
);

function Pricing() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const pricingTiers = [
    {
      title: 'Starter',
      price: 29,
      features: ['5 Projects', '2 TB Storage', 'Up to 10 users', '24/7 Support'],
      isPopular: false,
    },
    {
      title: 'Professional',
      price: 99,
      features: ['15 Projects', '10 TB Storage', 'Up to 50 users', 'Priority Support'],
      isPopular: true,
    },
    {
      title: 'Enterprise',
      price: 299,
      features: ['Unlimited Projects', 'Unlimited Storage', 'Unlimited Users', 'Dedicated Support'],
      isPopular: false,
    },
  ];

  return (
    <div id="pricing" className=" py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900" data-aos="fade-up">
          Choose the Right Plan for You
        </h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl" data-aos="fade-up" data-aos-delay="200">
          We have a plan that's perfect for your needs. Choose the features you want, and we'll provide the rest.
        </p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        {pricingTiers.map((tier, index) => (
          <PricingTier key={index} {...tier} />
        ))}
      </div>
    </div>
  );
}

export default Pricing;