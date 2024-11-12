import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#005F73] text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-bold">About Us</h4>
            <p className="mt-2 text-sm">
              We are dedicated to providing the best hotel booking experience for our users.
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="mt-2">
              <li><a href="#" className="hover:text-[#90E0EF] transition">Home</a></li>
              <li><a href="#" className="hover:text-[#90E0EF] transition">About</a></li>
              <li><a href="#" className="hover:text-[#90E0EF] transition">Services</a></li>
              <li><a href="#" className="hover:text-[#90E0EF] transition">Contact</a></li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <p className="mt-2 text-sm">Email: support@hotelbooking.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-[#90E0EF] hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-[#90E0EF] hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-[#90E0EF] hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-sm">
          © 2024 HotelBooking.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
