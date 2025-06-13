import React, { useState, useEffect } from "react";
import image from "../assets/login.jpg";
import api from "../../service/service";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function OTP() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "" });
  const [otpInput, setOtpInput] = useState({ otp: "" });

  const InputHandle = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setInput({ ...input, [name]: value });
  };

  const OtpHandle = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setOtpInput({ ...otpInput, [name]: value });
  };


  const OTPHandle = (e) => {
    e.preventDefault();
    const { otp } = otpInput;
    const Email = localStorage.getItem("email");
    // console.log(Email);
    // console.log( otp);

    api.post('/forgot-password/otp', {
      email: Email,
      otp: otp
    }).then(res => {
      toast.success(res.data.message)
      navigate("/reset-password")

      setInput({ email: "" });
      setOtpInput({ otp: "" });
    }).catch(err => {
      toast.error(err.response.data.message);
    })
  }

  const EmailHandle = (e) => {
    e.preventDefault();
    const { email } = input;

    // console.log(email);
    localStorage.setItem("email" , email);

    api.post('/forgot-password', {
      email : email
    }).then(res => {
      toast.success(res.data.message);
    }).catch(err => {
      // console.log(err);
      toast.error(err.response.data.message)
    })
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="bg-cyan-600 bg-opacity-60">
      <div data-aos="fade-up" className="relative w-full h-screen">
        <img
          src={image}
          alt="Login Background"
          className="absolute w-full h-full"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
        <div className="relative z-10 flex justify-end items-center h-full px-4 md:px-40 mr-2">
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="bg-blue-300 p-6 rounded-md shadow-md md:w-96 bg-opacity-60"
          >
            <div className="text-xl font-bold mb-4 text-center">
              Forgot Password
            </div>
            <form className="space-y-2">
              <div>
                <label htmlFor="email">Email</label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={input.email}
                    onChange={InputHandle}
                    className="w-full px-2 py-1  rounded-lg"
                  />

                  <button
                    className="bg-blue-600 text-white px-5 py-1 rounded-lg border active:scale-105 transition duration-300"
                    onClick={(e) => {
                      EmailHandle(e);
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="otp">OTP</label>
                <div className="flex items-center gap-2">
                  <input
                    type="otp"
                    name="otp"
                    id="otp"
                    value={otpInput.otp}
                    onChange={OtpHandle}
                    className="w-full py-1 px-2 rounded-lg"
                  />
                  <button className="bg-blue-600 text-white px-5 py-1 rounded-lg border"
                  onClick={OTPHandle}
                  >
                    Send
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Back to
                <Link
                  to="/login"
                  className="font-bold px-2 hover:text-blue-900"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OTP;
