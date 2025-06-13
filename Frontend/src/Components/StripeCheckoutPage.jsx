import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StripeCheckout from "./StripeCheckout";

function StripeCheckoutPage() {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.cart.allProducts.find((item) => item.id === id)
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl text-red-600 font-semibold">Product Not Found</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-4 p-4 sm:p-6 border rounded-xl shadow-md bg-white">
      <StripeCheckout product={product} />
      {/* < CheckoutForm products={product}/> */}
    </div>
  );
}

export default StripeCheckoutPage;
