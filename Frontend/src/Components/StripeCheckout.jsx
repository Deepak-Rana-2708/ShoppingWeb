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

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const CheckoutForm = ({ price, product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/create-checkout-session", {
      amount: price * 100,
    });

    const { clientSecret } = res.data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.error) {
      toast.error("Payment Failed");
      setMsg("❌ Payment Failed: " + result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const user_id = localStorage.getItem("user_id");

        if (product.id) {

          await api
            .post(`/direct_buy/${user_id}`, {
              product_id: product.id,
              items: product.name,
              image: product.image,
              price: product.price,
              quantity: 1,
              quantity_price: product.price,
            })
            .then((res) => {
              toast.success(res.data.message);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });

          toast.success("Payment Successful!");

          setMsg("✅ Payment Successful!");

          navigate("/app/item");

        } 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="px-8 py-2 rounded-md active:scale-105 transition duration-300 bg-green-600 hover:bg-green-700"
      >
        Pay
      </button>
      <p>{msg}</p>
    </form>
  );
};

function StripeCheckout({ product}) {
  return (
    <Elements stripe={stripePromise}>
      <div className="space-y-4 text-center">
        <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="mx-auto w-full max-w-xs h-48 object-cover rounded-lg shadow"
        />
        <p className="text-lg text-green-600 font-semibold">
          Price: ₹{product.price}
        </p>
        <CheckoutForm price={product.price} product={product} />
      </div>
    </Elements>
  );
}

export default StripeCheckout;
