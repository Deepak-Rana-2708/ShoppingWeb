import React,{useState,useEffect} from "react";
import image from "../assets/signup.jpg"
import api from "../../service/service"
import toast from "react-hot-toast"
import Login from "./Login"
import {useNavigate,Link} from "react-router-dom"
import AOS from 'aos'
import 'aos/dist/aos.css';


function Signup() {

  const navigate = useNavigate();
  const [input, setInput] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    const { fname, lname, email, password, phone, address } = input;
    
    api.post(`/create`,
      { fname, lname, email, password, phone, address })
      .then(res => {
        // console.log(res);
        // console.log(res.data.success,res.data.message);
        toast.success(res.data.message);
        if (res.data.success) {
          navigate('/login');
        } 
      })
      .catch(err => {
        if (err.response) {
          // console.log("Error Status : ", err.response.status);
          // console.log("Error Data : ", err.response.data.message);
          toast.error(err.response.data.message)
        }
      });
    setInput({
      fname: '',
      lname: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    })
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror : true
    })
  },[])
  
  return (
    <div className="bg-purple-400 bg-opacity-60">
      <div data-aos="fade-up"
        className="relative h-screen w-full">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    />

    <div className="absolute inset-0 bg-opacity-70 md:bg-gradient-to-r  md:to-transparent" />

    <div className="relative flex items-center justify-center md:justify-start h-full px-4 md:px-40">
          <div data-aos="fade-up"  data-aos-duration="3000"
            className="bg-purple-300 p-6 rounded-md shadow-md md:w-96 w-80 bg-opacity-60">
        <div className="text-xl font-bold mb-4 text-center">Signup</div>
        <form onSubmit={onSubmitHandler} className="space-y-2">
          <div>
            <label htmlFor="fname">Enter First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={input.fname}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="lname">Enter Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={input.lname}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="password">Enter Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="phone">Enter Phone Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={input.phone}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="address">Enter Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={input.address}
              onChange={handleInput}
              className="w-full px-2 py-1 border rounded-lg"
            />
          </div>
          <div className="py-2 w-full">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded mx-auto block
              active:scale-105 transition duration-300 border border-black"
            >
              Sign up
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link to="/login" className="font-bold px-3 hover:text-blue-900">
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

export default Signup;
