import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getTotalPrice = (arr: CartItem[]) => arr.reduce((sum, obj) => obj.price + sum, 0);
const allItems = (state: CartSliceState) => Object.values(state.cartItems).flatMap(obj => obj.items);


export type CartItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    size: number;
    type: string; 
}

export type Items = {
    [key: number]: {items: CartItem[], total: number, count: number}
}

interface CartSliceState {
    cartItems: Items ;
    totalPrice: number;
    totalCount: number;
}

const initialState: CartSliceState = {
    cartItems: {},
    totalPrice: 0,
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem>) => {
            !state.cartItems[action.payload.id] ?
                state.cartItems[action.payload.id] = { items: [action.payload], total: 0, count: 0 }
                : state.cartItems[action.payload.id].items = [...state.cartItems[action.payload.id].items, action.payload];
            state.cartItems[action.payload.id].total = getTotalPrice(state.cartItems[action.payload.id].items);
            state.cartItems[action.payload.id].count = state.cartItems[action.payload.id].items.length;
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },
        clearCartItems: (state) => {
            if (window.confirm('Are you sure you want to clear the cart?')) {
                state.cartItems = {};
                state.totalCount = 0;
                state.totalPrice = 0;
            }

        },

        deleteItem: (state, action: PayloadAction<number>) => {
            delete state.cartItems[action.payload];
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },

        itemPlus: (state, action: PayloadAction<CartItem>) => {
            state.cartItems[action.payload.id].items.push(action.payload);
            state.cartItems[action.payload.id].total = getTotalPrice(state.cartItems[action.payload.id].items);
            state.cartItems[action.payload.id].count = state.cartItems[action.payload.id].items.length;
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },

        itemMinus: (state, action: PayloadAction<number>) => {
            if (state.cartItems[action.payload].items.length > 1) {
                state.cartItems[action.payload].items.splice(0, 1)
                state.cartItems[action.payload].total = getTotalPrice(state.cartItems[action.payload].items);
                state.cartItems[action.payload].count = state.cartItems[action.payload].items.length;

            } else {
                delete state.cartItems[action.payload];
            }


            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        }

    }
});

export const selectCart = (state: RootState) => state.cart;
export const { setCartItems, clearCartItems, deleteItem, itemPlus, itemMinus } = cartSlice.actions;
export default cartSlice.reducer;