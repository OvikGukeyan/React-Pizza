import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        totalPrice: 0,
        totalCount: 0,
    },
    reducers: {
        setCartItems: (state, action) => {
            !state.items[action.payload.id] ?
            state.items[action.payload.id] = [action.payload]
            : state.items[action.payload.id] = [...state.items[action.payload.id], action.payload];
            state.totalCount = [].concat.apply([], Object.values(state.items)).length;
            state.totalPrice = [].concat.apply([], Object.values(state.items)).reduce((sum, obj) => obj.price + sum, 0);
        }, 
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        
    }
});

export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalCount = (state) => state.cart.totalCount;
export const selectCartItems = (state) => state.cart.items;
export const {setTotalPrice, setTotalCount, setCartItems} = cartSlice.actions;
export default cartSlice.reducer;