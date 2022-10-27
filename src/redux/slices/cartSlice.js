import { createSlice } from "@reduxjs/toolkit";

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);
const allItems = (state) => [].concat.apply([], Object.values(state.items).map(obj => obj.items))

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
                state.items[action.payload.id] = { items: [action.payload] }
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

        deleteItem: (state, action) => {
            delete state.items[action.payload];
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },

        itemPlus: (state, action) => {
            state.items[action.payload.id].items.push(action.payload);
            state.items[action.payload.id].total = getTotalPrice(state.items[action.payload.id].items);
            state.items[action.payload.id].count = state.items[action.payload.id].items.length;
            state.totalCount = allItems(state).length;
            state.totalPrice = getTotalPrice(allItems(state));
        },

        itemMinus: (state, action) => {
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

export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalCount = (state) => state.cart.totalCount;
export const selectCartItems = (state) => state.cart.items;
export const { setCartItems, clearCartItems, deleteItem, itemPlus, itemMinus } = cartSlice.actions;
export default cartSlice.reducer;