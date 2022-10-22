import { createSlice } from "@reduxjs/toolkit";
import  axios  from "axios";

export const fetchPizzas = (sortBy, category) => (dispatch) => {
    dispatch(setLoaded(false))
    axios.get(`https://6350fa043e9fa1244e51f54d.mockapi.io/pizzas?sortBy=${sortBy.type}&order=${sortBy.order}&${category !== null ? `category=${category}` : ''}`)
    .then(({data}) => {
      dispatch(setPizzas(data))
    })
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        items: [],
        isLoaded: false
    },
    reducers: {
        setPizzas: (state, action) => {
            state.items = action.payload;
            state.isLoaded = true;
        },

        setLoaded: (state, action) => {
            state.isLoaded = action.payload;
        }

        
        
    }
});

export const selectIsLoaded = (state) => state.pizzas.isLoaded
export const selectPizzas = (state) => state.pizzas.items;
export const {setPizzas, setLoaded} = pizzasSlice.actions; 
export default pizzasSlice.reducer;
