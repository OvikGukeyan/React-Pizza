import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async ({ sortBy, category, searchValue, currentPage }) => {
    const {data} = await axios.get(`https://635fcafd3e8f65f283bba8bc.mockapi.io/pizzas?p=${currentPage}&l=4&sortBy=${sortBy.type}&order=${sortBy.order}&${category !== null ? `category=${category}` : ''}&${searchValue ? `search=${searchValue}` : ''}`)
    return data
})


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        items: [],
        isLoaded: false,
        loadingRejected: false,
    },

    

    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = [];
            state.isLoaded = false;
            state.loadingRejected = false;
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.isLoaded = true;
            state.items = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = [];
            state.isLoaded = true;
            state.loadingRejected = true;
        },

    }
});

export const selectIsLoaded = (state) => state.pizzas.isLoaded;
export const selectLoadingRejected = (state) => state.pizzas.loadingRejected;
export const selectPizzas = (state) => state.pizzas.items;

export default pizzasSlice.reducer;
