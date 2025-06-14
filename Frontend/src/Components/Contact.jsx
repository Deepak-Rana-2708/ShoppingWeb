import React, { useState, useEffect } from "react";
import api from "../../service/service";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookie from "js-cookie";

function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const InputHandle = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setInput({ ...input, [name]: value });
  };
  const submitContact = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      return toast.error("Please Login !");
    }

    const { name, email, message } = input;

    try {
      const res = await api.post("/contact/data", { name, email, message });
      toast.success(res.data.message || "Message sent successfully!");
      setInput({ name: "", email: "", message: "" }); // Reset form only on success
    } catch (err) {
      // Error handling - backend error message ya fallback message
      const errorMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Something went wrong!";
      toast.error(errorMsg);
    }
  };
  useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  },[setIsLoggedIn])

  return (
    <div data-aos="fade-up">
      <div className="bg-gray-100 rounded-lg mt-4 mb-4 text-gray-800 px-6 py-12 max-w-4xl mx-auto shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <p className="text-center text-lg mb-8">
          We'd love to hear from you! Whether you have a question, feel free to
          reach out.
        </p>

        <form onSubmit={submitContact} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={InputHandle}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={InputHandle}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-1"
            >
              Message
            </label>
            <textarea
              rows="5"
              id="message"
              name="message"
              value={input.message}
              onChange={InputHandle}
              placeholder="Write your message here..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
