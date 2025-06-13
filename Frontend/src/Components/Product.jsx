import React,{useEffect,useState} from 'react'
import { nanoid } from 'nanoid'
import Beg from "../assets/Beg.jpg"
import headphone from "../assets/headphone.jpg"
import headphone2 from "../assets/headphone2.jpg"
import shoe from "../assets/shoe.jpg"
import BlackTShirt from "../assets/T-Shirt.jpg"
import waterBottle from "../assets/waterbottle.jpg"
import watch from "../assets/watch.jpg"
import WhiteTShirt from "../assets/White-T-Shirt.jpg"
import Cart from './Cart'
import { useDispatch } from 'react-redux'
import { addToCart } from './Redux/CartSlice'
import api from '../../service/service' 
import store from './Redux/Store'
import { toast } from 'react-hot-toast'
import Cookie from "js-cookie";
import AOS from 'aos'
import 'aos/dist/aos.css';
import {useNavigate} from 'react-router-dom'

  export const products = [
    { id: nanoid(), name: 'Beg', Actualprice: 500, price: 250, image: Beg },
    { id: nanoid(), name: 'HeadPhone', Actualprice: 600, price: 300, image: headphone },
    { id: nanoid(), name: 'Silver HeadPhone', Actualprice: 30, price: 350, image: headphone2 },
    { id: nanoid(), name: 'Shoes', Actualprice: 800, price: 400, image: shoe },
    { id: nanoid(), name: 'Black T-Shirt', Actualprice: 450, price: 225, image: BlackTShirt },
    { id: nanoid(), name: 'Water Bottle', Actualprice: 200, price: 100, image: waterBottle },
    { id: nanoid(), name: 'White T-Shirt', Actualprice: 500, price: 250, image: WhiteTShirt },
    { id: nanoid(), name: 'Watch', Actualprice: 1400, price: 700, image: watch },
  ];


function Product() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BuyItem = (product) => {

    if (!isLoggedIn) {
     return toast.error("Please Login !");
    }

     navigate(`/app/payment/${product.id}`)

  }

  const AddCart = (product) => {

    if (!isLoggedIn) {
      return toast.error("Please Login !");
    }

    dispatch(addToCart(product));
    // toast.success(`${product.name} added to cart!`);

    const user_id = localStorage.getItem('user_id');

    const state = store.getState();
    const cartItems = state.cart.cartItems;
    // const totalAmount = state.cart.totalAmount;
    
    const foundItem = cartItems.find(item => item.id === product.id);
    
    const quantity_price = foundItem.quantity * foundItem.price;

    // console.log("Quantity price : ", quantity_price)

    if (foundItem) {

      api.post(`/order/${user_id}`, {
        product_id: foundItem.id,
        items: foundItem.name,
        image: foundItem.image,
        price: foundItem.price,
        quantity: foundItem.quantity,
        quantity_price: quantity_price,
      })
        .then(res =>
          toast.success(`${product.name} ${res.data.message}`)
      ).catch(err => {
        // console.log(err);
          toast.error(err.response.data.message || "Failed to add item to order");
          // toast.error("Failed to add item to order");
      })
    }
    
  }

  useEffect(() => {
    const token = Cookie.get("token");
    setIsLoggedIn(!!token);
  },[setIsLoggedIn])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror:true
     })
  },[]);

  return (
    <>
      <div
      className="p-4"
    >
        <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {
          products.map((product,index )=> (
            <div key={product.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`} // delay animation in this help we got smooth animation
              className="border rounded-lg p-5 shadow hover:shadow-xl transition"
            > 
              <img src={product.image} alt="product Image"
                className="w-full h-40 object-fill rounded transition duration-300 hover:scale-105"
              />
              <h2
                className="text-lg font-semibold mt-2"
              >{product.name}</h2>
              <div className="flex items-center gap-2">
                <p
                className="text-gray-600 line-through"
              >₹{product.Actualprice}</p>
              <p
                className="text-gray-600"
              >₹{product.price}</p>
              </div>
              <div className="flex items-center gap-16">
                <button
                  className="mt-2 px-4 py-2 active:scale-105 transition duration-300 border-black bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={()=>BuyItem(product)}
                >Buy Now</button>
                <button
                className="mt-2 px-4 py-2 active:scale-105 transition duration-300 border-black bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={()=> AddCart(product)}
                >Add Cart</button>
              </div>
            </div>
          ))
        }
      </div>
      
      </div>
    </>
  )
}

export default Product
