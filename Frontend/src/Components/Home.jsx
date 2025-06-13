import React, { useEffect } from "react";
import homebanner from "../assets/Home.jpg";
import { useNavigate } from "react-router-dom";
import api from "../../service/service";
import { useDispatch} from "react-redux";
import { addItemFromBackend } from "./Redux/CartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ClickEvent = () => {
    navigate("/app/item");
  };

  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (user_id) {
      api.get(`/pending/data/${user_id}`).then((res) => {
        const items = res.data.message;
        if (items.length > 0) {
          items.forEach((item) => {
            dispatch(
               addItemFromBackend({
                id: item.product_id,
                name: item.items,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                QuantityPrice: item.quantity_price,
              })
            );
          });
        }
      });
    }
  }, []);

    useEffect(() => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true,
      });
    }, []);

  return (
    <div className="bg-black bg-opacity-60">
      <div data-aos="fade-up">
      <div className="relative w-full h-screen">
        <img src={homebanner} alt="Banner" className="w-full h-full" />
        <div
          className="absolute w-full flex flex-col items-center text-center px-4"
          style={{
            top: "250px", // Default for large devices
          }}
        >
            <h1 data-aos="fade-up" data-aos-duration="2000"
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Welcome to Mega Sale!
          </h1>
            <p data-aos="fade-up" data-aos-duration="2000"
  className="text-sm sm:text-base md:text-xl text-white mb-2 max-w-xl">
  Flat 50% Off on All Products – Limited Time Offer
</p>

<p data-aos="fade-up" data-aos-duration="2000"
  className="text-xs sm:text-sm md:text-lg text-yellow-300 mb-4 max-w-xl font-medium italic">
  This website exclusively offers products with a 50% discount.
</p>

          <button data-aos="fade-up" data-aos-duration="2000"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 text-white rounded-lg
           hover:bg-red-500 active:scale-95 transition duration-300 text-sm sm:text-base"
            onClick={ClickEvent}
          >
            Get Start
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
