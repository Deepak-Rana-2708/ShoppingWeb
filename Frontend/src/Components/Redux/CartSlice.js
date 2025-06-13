import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
    QuantityPrice: 0,
    allProducts: [],
    filteredProducts: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                // state.totalAmount += existingItem.price;
                existingItem.QuantityPrice = existingItem.quantity * existingItem.price;
                // console.log("Quantity Price", state.QuantityPrice);
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                    QuantityPrice: newItem.price,
                });
            }
            state.totalQuantity += 1;
            state.totalAmount += newItem.price;
        },

        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
                state.totalAmount = state.totalAmount - existingItem.QuantityPrice;
                state.totalQuantity -= existingItem.quantity;
            }
        },

        addItemFromBackend(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (!existingItem) {
                
                const totalItemPrice = newItem.price * newItem.quantity;
                
                state.cartItems.push({
                    ...newItem,
                    QuantityPrice: totalItemPrice
                })
                state.totalQuantity += 1;
                state.totalAmount += newItem.price;
            }
        },

        clearCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },

        addAllProduct(state, action) {
            state.allProducts = action.payload;
        }

    },
});

export const { addToCart, removeFromCart, clearCart, addItemFromBackend, addAllProduct } = cartSlice.actions;
export default cartSlice.reducer;
