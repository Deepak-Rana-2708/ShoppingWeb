import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const [ email, setEmail ] = useState("");
  const Subscribe = (e) => { 
    e.preventDefault();
    if (email === "") {
      alert("Please enter a valid email address");
      return;
    }
    if (confirm("Do you want to subscribe to our newsletter?")) {
       alert("Subscribed to Newsletter");
    }
    setEmail("");
  }
  return (
    <div
      className="flex flex-col md:flex-row md:justify-evenly items-start md:items-center
     w-full bg-gray-800 text-white px-4 py-6 space-y-6 md:space-y-0"
    >
      {/* Company Info */}
      <div className="flex flex-col items-start">
        <h1 className="text-xl font-bold mb-1">Shopping Web</h1>
        <p className="text-sm">Your one-stop shop for everything!</p>
        <div className="flex space-x-4 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-white text-xl hover:text-blue-600"
            />
          </a>
           <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-white text-xl hover:text-blue-400"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-white text-xl hover:text-pink-400"
            />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-bold mb-2">QUICK LINKS</h1>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="/app/home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/app/item" className="hover:underline">
              Product
            </a>
          </li>
          <li>
            <a href="/app/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/app/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-bold mb-2">CONTACT</h1>
        <p className="text-sm">Email: support@shoppingweb.com</p>
        <p className="text-sm">Phone: +91 91111 47550</p>
      </div>

      {/* Newsletter */}
      <div className="flex flex-col items-start">
        <h1 className="text-lg font-bold mb-2">NEWSLETTER</h1>
        <input
          type="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-1 rounded text-black text-sm w-48"
        />
        <button onClick={Subscribe}
          className="mt-2 bg-white text-blue-800 px-3 py-1 rounded hover:bg-gray-200 text-sm">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Footer;
