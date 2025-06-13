import React,{useState,useEffect} from 'react'
import image from '../assets/login.jpg'
import api from '../../service/service'
import toast from "react-hot-toast"
import { useNavigate, Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css';

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password : ''
  })
  const InputHandle = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setInput({ ...input, [name]: value });
  }
  const onSubmitHandler = (e) => {
    // className="w-full px-2 py-1 border rounded-lg"
    const { email, password } = input;
    e.preventDefault(); 
    // console.log(email, password);
    api.post(`/login`, { email, password })
      .then((res) => {
        toast.success(res.data.message)
        // console.log(res.data.user_id);
        const user_name = res.data.user_name;
        const user_id = res.data.user_id;  // User_id Store in localStorage //
        localStorage.setItem('user_name', user_name);
        localStorage.setItem('user_id', user_id);
        if (res.data.success) {
          navigate('/app/home')
        }
      })
      .catch(err => {
        if (err.response) {
          // console.log(err.response.data.message);
          toast.error(err.response.data.message)
      }
      })
    setInput({
      email: '',
      password: ''
    })
  }

   useEffect(() => {
          AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror:true
           })
   }, []);
  
  return (
    <div
       className="bg-cyan-600 bg-opacity-60"
    >
      <div data-aos="fade-up"
      className="relative w-full h-screen"
    >
      <img src={image} alt="Login Background"
        className="absolute w-full h-full"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
      <div className="relative z-10 flex justify-end items-center h-full px-4 md:px-40 mr-2">
          <div data-aos="fade-up" data-aos-duration="3000"
            className="bg-blue-300 p-6 rounded-md shadow-md md:w-96 bg-opacity-60">
      <div className="text-xl font-bold mb-4 text-center">LOGIN</div>
        <form onSubmit={onSubmitHandler} className="space-y-2">
          <div>
          <label htmlFor="email">Email</label>
          <input type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={InputHandle}
              className="w-full px-2 py-1  rounded-lg"
          />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={InputHandle}
              className="w-full py-1 px-2 rounded-lg"
            />
          </div>
          <div className="py-2 w-full">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-1 rounded-lg border
              mx-auto block 
              active:scale-105 transition duration-300 border-black"
            >Login</button>
              </div>
              <div
                className="text-center text-sm"
              >
                <Link
                  to="/forgot-password"
                  className= "hover:text-blue-900"
                >
                  Forgot Password ?
                </Link>
            </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link
              to="/signup"
              className="font-bold px-2 hover:text-blue-900"
            >
              Signup
            </Link>
          </div>
          </form>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Login