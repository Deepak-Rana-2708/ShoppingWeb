import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible : false,
}
const CartDrawerSlice = createSlice({
    name: 'cartDrawer',
    initialState,
    reducers: {
        openCartDrawer(state) {
            state.isVisible = true;
        },
        closeCartDrawer(state) {
            state.isVisible = false;
        },
        toggleCartDrawer(state) {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { toggleCartDrawer, openCartDrawer, closeCartDrawer } = CartDrawerSlice.actions;
export default CartDrawerSlice.reducer;