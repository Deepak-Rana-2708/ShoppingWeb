import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './Redux/CartSlice';
import store from './Redux/Store'
import toast from 'react-hot-toast'
import api from '../../service/service'
import Cookiee from 'js-cookie'
import { useNavigate } from 'react-router-dom';

function ProductDetail() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const BuyProduct = () => {
        if (!isLoggedIn) {
             return toast.error("Please Login !");
      }
    
      navigate(`/app/payment/${product.id}`)
            
    }

    const AddtoCart = (product) => {

        if (!isLoggedIn) {
            return toast.error("Please Login!");
        }

        // console.log('testing add to cart',product);

        dispatch(addToCart(product));

        const user_id = localStorage.getItem('user_id');

        const state = store.getState();
        const cartItems = state.cart.cartItems;

        const foundItem = cartItems.find(item => item.id === product.id);
        const quantity_price = foundItem.quantity * foundItem.price;

        if (foundItem) {
            api.post(`/order/${user_id}`, {
                product_id: foundItem.id,
                items: foundItem.name,
                image: foundItem.image,
                price: foundItem.price,
                quantity: foundItem.quantity,
                quantity_price: quantity_price
            })
                .then(res =>
                    toast.success(`${product.name} Add Cart`,res.data.message)
            ).catch(() => {
                toast.error( "Failed to add item to order");
            })
        }
    }

    const { id } = useParams();
    // console.log(id)
    const product = useSelector(state => state.cart.allProducts.find(item => item.id === id));

   useEffect(() => {
        const token = Cookiee.get('token');
        setIsLoggedIn(!!token);
    },[setIsLoggedIn])


    if (!product) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl text-red-600 font-semibold">
        Product Not Found
      </p>
    </div>
  );
}


  return (
     <div className="p-4 xl:p-8 xl:mb-8 xl:mt-4 border rounded-2xl shadow-md max-w-sm mx-auto bg-gray-300">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-64 object-cover rounded-xl hover:scale-105 trasition duration-300"
  />

  <div className="mt-4 space-y-2">
    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>

    <div className="flex items-center space-x-3">
      <p className="text-gray-500 line-through">₹{product.Actualprice}</p>
      <p className="text-green-600 font-bold">₹{product.price}</p>
    </div>
  </div>

  <div className="mt-6 flex space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition active:scale-105 duration-300"
          onClick={BuyProduct}
              >
      Buy Now
    </button>
              <button className="px-4 py-2 border bg-green-600 text-white rounded-lg hover:bg-green-700 transition active:scale-105 duration-300"
                onClick={()=>AddtoCart(product)}
              >
      Add to Cart
        </button>

      </div>
</div>

  )
}

export default ProductDetail