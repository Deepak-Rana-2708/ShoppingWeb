import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Cookie from "js-cookie";
import logo from "../assets/logo.png";
import Cart from "./Cart";
import toast from "react-hot-toast";
import api from "../../service/service";
import { useDispatch, useSelector } from "react-redux"; // Redux
import { toggleCartDrawer } from "./Redux/CartDrawer"; // Redux
import { clearCart } from "./Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { products } from "./Product";
import { addAllProduct } from "./Redux/CartSlice";

function Header() {
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const isVisible = useSelector((state) => state.CartDrawer.isVisible);
  const allproduct = useSelector((state) => state.cart.allProducts);

  const filterProduct = allproduct.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  // console.log(totalQuantity);
  // console.log(allproduct);

  const Items = useSelector((state) => state.cart.cartItems);
  // console.log(Items);

  const Logout = () => {
    api
      .get(`/logout`)
      .then((res) => {
        // console.log(res.data.message);
        dispatch(clearCart());
        localStorage.clear();
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err) {
          toast.error("Logout failed");
        }
      });
  };

  const user_name = localStorage.getItem('user_name') || "";
  const initial = user_name ? user_name.charAt(0).toUpperCase() : '';


  useEffect(() => {
    dispatch(addAllProduct(products));
  });

  useEffect(() => {
    const token = Cookie.get("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <header className="bg-gray shadow-md">
        <nav className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Sidebar menu */}
          {isMenuOpen && (
            <div
              className="fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white
              shadow-lg z-50 p-5 transition-transform duration-300 md:hidden"
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute top-4 right-4 text-xl text-gray-800"
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>
              <ul className="mt-12 space-y-4">
                <li>
                  <NavLink
                    to="/app/home"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/item"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }
                  >
                    Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/about"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/app/contact"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="relative group inline-block">
                  <Link
                    onClick={() => dispatch(toggleCartDrawer())}
                    className="hover:Cart"
                  >
                    🛒 ({totalQuantity})
                  </Link>
                  <span className="absolute font-bold left-1/2 -translate-x-1/2 top-4 text-gray-800 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Cart
                  </span>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                          {initial}
                        </div>
                        <span className="text-gray-800 font-medium" >{ user_name}</span>
                      </div>
                    </li>
                      <li>
                    <button
                      onClick={Logout}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer
                    active:scale-105 transition duration-300 border-black"
                    >
                      Logout
                    </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => navigate("/login")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer
                    active:scale-105 transition duration-300 border-black"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/signup")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer
                    active:scale-105 transition duration-300 border-black"
                      >
                        Signup
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
          <div>
            <img src={logo} alt="logo" className="h-16 w-auto" />
          </div>
          <div className="flex">
            <ul className="flex space-x-4 text-sm md:text-base mr-6">
              <li>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Here"
                    name="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border rounded-xl border-black pl-2
                  py-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />

                  {input && (
                    <div
                      className="absolute bg-white border rounded mt-2 w-full max-h-60
                      overflow-y-auto z-50"
                    >
                      {filterProduct.length > 0 ? (
                        <>
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => setInput("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
                          />
                          {filterProduct.map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                navigate(`/app/product/${product.id}`); //params id send
                              }}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded"
                              />
                              <span>{product.name}</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="p-2 text-gray-500">No Product found</p>
                      )}
                    </div>
                  )}
                </div>
              </li>
            </ul>
            <ul className="hidden md:flex space-x-6 xl:-flex">
              <li>
                <NavLink
                  to="/app/home"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app/item"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                  }
                >
                  Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app/about"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app/contact"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-gray-700"
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li className="relative group inline-block">
                <Link
                  onClick={() => dispatch(toggleCartDrawer())}
                  className="hover:Cart"
                >
                  🛒 ({totalQuantity})
                </Link>
                <span className="absolute font-bold left-1/2 -translate-x-1/2 top-4 text-gray-800 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Cart
                </span>
              </li>
              {
                isLoggedIn ? (
                  <>
                  <li>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                          {initial}
                        </div>
                        <span className="text-gray-800 font-medium" >{ user_name}</span>
                      </div>
                    </li>
                    <li>
                <button
                  onClick={Logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer
                    active:scale-105 transition duration-300 border-black"
                >
                  Logout
                </button>
                  </li>
                  </>
                ): (
                    <>
                      <li>
                <button
                  onClick={()=>navigate("/login")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer
                    active:scale-105 transition duration-300 border-black"
                >
                  Login
                </button>
                      </li>
                      <li>
                <button
                  onClick={()=> navigate("/signup")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer
                    active:scale-105 transition duration-300 border-black"
                >
                  Signup
                </button>
              </li>
                    </> 
                )
              }
            </ul>
          </div>
        </nav>
      </header>
      {isVisible && <Cart />}
    </div>
  );
}

export default Header;
