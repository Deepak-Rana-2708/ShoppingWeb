import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
  }, []);

  return (
    <div data-aos="fade-up">
      <div className="bg-gray-800 rounded-lg mt-4 mb-4 text-white px-6 py-12 max-w-5xl mx-auto
        hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>

        <p className="text-lg leading-7 mb-6 text-center">
          Welcome to <span className="font-semibold">Shopping Web</span> — your one-stop destination for hassle-free online shopping. We bring you a smooth, secure, and smart shopping experience, tailored for your needs.
        </p>

        <div className="space-y-4 text-justify">
          <p>
            <span className="font-semibold">Shopping Web</span> is a demo e-commerce website created to demonstrate full-stack development skills and core functionalities. This platform includes user authentication, OTP-based password reset, product listings, add-to-cart logic, and more.
          </p>

          <p>
            Although only 8 products are listed here (with 50% off for testing), the main goal of this project is to showcase practical features like cart management, user login, and secure database integration — all built using React, Node.js, Express, Sequelize, and MySQL.
          </p>

          <p>
            Features like fast performance, real-time cart tracking, data persistence, and OTP verification have been implemented to enhance the user experience and demonstrate development capabilities.
          </p>

          <p>
            This project focuses on learning, improving coding skills, and understanding how real e-commerce systems work — from frontend design to backend logic.
          </p>

          <p>
            Thank you for visiting <span className="font-semibold">Shopping Web</span>. We hope you enjoy exploring it as much as we enjoyed building it!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
