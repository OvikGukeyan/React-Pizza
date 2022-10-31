import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzass', async ({sortBy, category}) =>{
    const resp = await axios.get(`https://635fcafd3e8f65f283bba8bc.mockapi.io/pizzas?sortBy=${sortBy.type}&order=${sortBy.order}&${category !== null ? `category=${category}` : ''}`)
    return resp.data
})


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        items: [],
        isLoaded: false,
        loadingRejected: false
    },
    
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.isLoaded = false;
            state.loadingRejected = false;
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.isLoaded = true; 
            state.items = action.payload;
        },
        [fetchPizzas.rejected]: (state) => {
            state.isLoaded = false;
            state.loadingRejected = true;
        },

    }
});

export const selectIsLoaded = (state) => state.pizzas.isLoaded
export const selectPizzas = (state) => state.pizzas.items;
export const {setPizzas, setLoaded} = pizzasSlice.actions; 
export default pizzasSlice.reducer;
