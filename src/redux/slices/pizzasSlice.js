import { createSlice } from "@reduxjs/toolkit";

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        items: [],
        isLoaded: false
    },
    reducers: {
        setPizzas: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const selectPizzas = (state) => state.pizzas.items;
export const {setPizzas} = pizzasSlice.actions; 
export default pizzasSlice.reducer;
