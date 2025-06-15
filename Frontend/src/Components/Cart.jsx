import React from 'react'
import { closeCartDrawer } from './Redux/CartDrawer'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from './Redux/CartSlice';
import api from '../../service/service'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import StripeCheckout from './StripeCheckout';

function Cart() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const state = useSelector(state => state.cart.cartItems);
  // console.log("State : ", state);

  const product_id = state.map(item => item.id);

  // console.log("Product ID : ", product_id);

  const BuyProducts = () => { 
    // const user_id = localStorage.getItem('user_id');
    // console.log(product_id);
    navigate('/app/add-to-cart-payment')
  }

  const user_id = localStorage.getItem('user_id');

  const DeleteItem = (id) => {
    api.post("/order/delete/data", {
      orderid: id,
      userid : user_id
    })
      .then(res => {
      toast.success(res.data.message)
      })
      .catch(err => {
        toast.error(err.response.data.message)
    })
  }
 
  return (
    <>
    <div className="absolute top-0 right-0 w-64 h-screen bg-gray-400 z-50 p-4 shadow-lg">
      {/* Close button */}
      <button
        onClick={() => dispatch(closeCartDrawer())}
        className="self-end text-gray-600 hover:text-gray-900 mb-4"
        aria-label="Close cart"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border-b border-gray-200 pb-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded transition duration-300 hover:scale-105"
              />
              <div className="flex flex-col flex-grow">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-800">Qty: {item.quantity}</p>
              </div>
              { 
                <p className="font-semibold text-gray-900">₹{item.QuantityPrice}</p>
              }
              <button
                onClick={() => {
                  dispatch(removeFromCart(item.id))
                  DeleteItem(item.id)
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div>
      
        <div
          className={cartItems.length === 0 ? "opacity-0" : "mt-4 flex justify-center font-bold text-lg text-gray-800 opacity-100"}
        >
          <p>Total Amount : {
            useSelector((state) => state.cart.totalAmount)
          }</p>
        </div>
        <div
          className="mt-6 flex space-x-8 justify-center"
        >
          <button
            className={cartItems.length === 0 ? "opacity-0" : " px-4 py-2 bg-red-600 text-white rounded active:scale-105 opacity-100"}
            onClick={() => {
               
              DeleteItem(product_id);
              dispatch(clearCart())
            }}
          >Clear</button>
          <button
            onClick={BuyProducts}
            className={cartItems.length === 0 ? "opacity-0" : " px-4 py-2 bg-red-600 text-white rounded active:scale-105 opacity-100"}
          >Buy</button>
        </div>
      </div>
      </div>
      </>
  );
}

export default Cart
