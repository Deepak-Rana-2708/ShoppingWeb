import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import CartDrawerReducer from './CartDrawer';
import Cart from '../Cart';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        CartDrawer: CartDrawerReducer,
    }
})

export default store;