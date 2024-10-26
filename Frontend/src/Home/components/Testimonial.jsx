/* eslint-disable react/prop-types */
import { Star, User } from 'lucide-react';

const TestimonialCard = ({ name, role, content, rating }) => (
  <div className="bg-green-50 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center mb-4">
      <div className="bg-green-100 rounded-full p-2 mr-4">
        <User className="text-green-700" size={24} />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-green-800">{name}</h3>
        <p className="text-green-600">{role}</p>
      </div>
    </div>
    <p className="text-green-700 mb-4">{content}</p>
    <div className="flex">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="text-yellow-400 fill-current" size={20} />
      ))}
    </div>
  </div>
);

const Testimonial = () => {
  const testimonials = [
    {
      name: "Kanwal Singh Chauhan",
      role: "Organic Farmer",
      content: "This app has revolutionized how I manage plant diseases. The quick diagnosis feature saved my tomato crop last season!",
      rating: 5
    },
    {
      name: "Kamala Pujhari",
      role: "Vineyard Owner",
      content: "The weather alerts are incredibly accurate. I've optimized my irrigation schedule and saved water thanks to this app.",
      rating: 4
    },
    {
      name: "Rajesh Patel",
      role: "Hobby Gardener",
      content: "As a beginner, the AI assistant has been invaluable. It's like having an expert gardener on call 24/7!",
      rating: 5
    }
  ];

  return (
    <div id="testimonial" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;