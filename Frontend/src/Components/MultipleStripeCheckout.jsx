import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../service/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./Redux/CartSlice";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/create-checkout-session", {
      amount: totalAmount * 100,
    });

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error("Payment Failed");
        setMsg("❌ " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const user_id = localStorage.getItem("user_id");

       const product_id = cartItems.map(item => item.id)

        // Send all products as order
       await api.post('/order/update/data', {
      orderid: product_id,
      userid : user_id
    }).then(res => {
      toast.success(res.data.message)
    })
      .catch(err => {
      toast.error(err.response.data.message)
      })

        toast.success("Payment Successful!");
        setMsg("✅ Payment Successful!");

        dispatch(clearCart());
        navigate("/app/item");
      }
    } catch (err) {
      toast.error("Error during payment");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 px-8 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
      >
        Pay ₹{totalAmount}
      </button>
      <p className="mt-2">{msg}</p>
    </form>
  );
};

function MultiProductCheckout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-xl mx-auto mt-8 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Pay for All Cart Items</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.QuantityPrice}</span>
            </div>
          ))}
          <div className="font-bold text-right">Total: ₹{totalAmount}</div>
        </div>
        <CheckoutForm totalAmount={totalAmount} cartItems={cartItems} />
      </div>
    </Elements>
  );
}

export default MultiProductCheckout;