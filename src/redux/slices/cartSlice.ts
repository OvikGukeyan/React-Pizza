import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getTotalPrice = (arr: CartItem[]) => arr.reduce((sum, obj) => obj.price + sum, 0);
// const allItems = (state: CartSliceState) => [].concat.apply([], Object.values(state.items).map(obj => obj.items));
const allItems = (state: CartSliceState) => Object.values(state.items).map(obj => obj.items).flatMap(item => item);


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
    items: Items ;
    totalPrice: number;
    totalCount: number;
}

const initialState: CartSliceState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem>) => {
            !state.items[action.payload.id] ?
                state.items[action.payload.id] = { items: [action.payload], total: 0, count: 0 }
                : state.items[action.payload.id].items = [...state.items[action.payload.id].items, action.payload];
            state.items[action.payload.id].total = getTotalPrice(state.items[action.payload.id].items);
            state.items[action.payload.id].count = state.items[action.payload.id].items.length;
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },
        clearCartItems: (state) => {
            if (window.confirm('Are you sure you want to clear the cart?')) {
                state.items = {};
                state.totalCount = 0;
                state.totalPrice = 0;
            }

        },

        deleteItem: (state, action: PayloadAction<number>) => {
            delete state.items[action.payload];
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },

        itemPlus: (state, action: PayloadAction<CartItem>) => {
            state.items[action.payload.id].items.push(action.payload);
            state.items[action.payload.id].total = getTotalPrice(state.items[action.payload.id].items);
            state.items[action.payload.id].count = state.items[action.payload.id].items.length;
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },

        itemMinus: (state, action: PayloadAction<number>) => {
            if (state.items[action.payload].items.length > 1) {
                state.items[action.payload].items.splice(0, 1)
                state.items[action.payload].total = getTotalPrice(state.items[action.payload].items);
                state.items[action.payload].count = state.items[action.payload].items.length;

            } else {
                delete state.items[action.payload];
            }


            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        }

    }
});

export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectTotalCount = (state: RootState) => state.cart.totalCount;
export const selectCartItems = (state: RootState) => state.cart.items;
export const { setCartItems, clearCartItems, deleteItem, itemPlus, itemMinus } = cartSlice.actions;
export default cartSlice.reducer;