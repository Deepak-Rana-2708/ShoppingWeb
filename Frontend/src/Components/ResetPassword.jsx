import React, { useState, useEffect } from "react";
import image from "../assets/login.jpg";
import api from "../../service/service";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


function ResetPassword() {

    const navigate = useNavigate();
    const [password, setPassword] = useState({newPassword: "", confirmPassword: ""});

  const InputHandle = (e) => {
    const {name, value} = e.target;
    // console.log(name, value);
    setPassword({...password,[name] : value})
  }

  const PasswordHandle = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = password;
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    const Email = localStorage.getItem("email");

    api.post('/reset-password', {
      email: Email,
      password : newPassword
    })
      .then(res => {
        toast.success(res.data.message);
        navigate("/login");
        setPassword({ newPassword: "", confirmPassword: "" }); // Reset form only on success
        localStorage.removeItem("email"); // Clear email from localStorage
      })
      .catch(err => {
        toast.error(err.response.data.message);
    })
  }
    
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
                <div className="space-y-2">
                  <label htmlFor="Password">Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="Password"
                      value={password.newPassword}
                      onChange={InputHandle}
                      className="w-full px-2 py-1  rounded-lg"
                  />
                  
                  <label htmlFor="confirmpass">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmpass"
                      value={password.confirmPassword}
                      onChange={InputHandle}
                  className="w-full px-2 py-1  rounded-lg"
                />
                <div className="w-full flex justify-center">
                  <button
                      className="bg-blue-600 m-4 text-white px-5 py-1 rounded-lg border active:scale-105 transition duration-300"
                      onClick={(e) => {
                        PasswordHandle(e);
                      }}
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

export default ResetPassword