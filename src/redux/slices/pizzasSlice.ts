import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SortBy } from "./filtersSlice";

type Options = {
    sortBy: SortBy;
    category: number | null;
    searchValue: string;
    currentPage: number
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], Options>('pizzas/fetchPizzas', async ({ sortBy, category, searchValue, currentPage }) => {
    const {data} = await axios.get<PizzaItem[]>(`https://635fcafd3e8f65f283bba8bc.mockapi.io/pizzas?p=${currentPage}&l=4&sortBy=${sortBy.type}&order=${sortBy.order}&${category !== null ? `category=${category}` : ''}&${searchValue ? `search=${searchValue}` : ''}`)
    return data;
})

export type PizzaItem = {
    id: number;
    imageUrl: string;
    name: string;
    types: number[]; 
    sizes: number[];
    price: number;
    category: number | null;
    rating: number;
}

interface PizzaSliceState {
    pizzaItems: PizzaItem[];
    isLoaded: boolean;
    loadingRejected: boolean;
}

const initialState: PizzaSliceState = {
    pizzaItems: [],
    isLoaded: false,
    loadingRejected: false,
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems (state, action: PayloadAction<PizzaItem[]>) {
            state.pizzaItems = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.pizzaItems = [];
            state.isLoaded = false;
            state.loadingRejected = false;
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.isLoaded = true;
            state.pizzaItems = action.payload;
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.pizzaItems = [];
            state.isLoaded = true;
            state.loadingRejected = true;
        });
    }
    
    // {
    //     [fetchPizzas.pending]: (state) => {
    //         state.items = [];
    //         state.isLoaded = false;
    //         state.loadingRejected = false;
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.isLoaded = true;
    //         state.items = action.payload;
    //     },
    //     [fetchPizzas.rejected]: (state) => {
    //         state.items = [];
    //         state.isLoaded = true;
    //         state.loadingRejected = true;
    //     },
    // },
});

export const selectPizzas = (state: RootState) => state.pizzas;

// export const selectIsLoaded = (state: RootState) => state.pizzas.isLoaded;
// export const selectLoadingRejected = (state: RootState) => state.pizzas.loadingRejected;
// export const selectPizzas = (state: RootState) => state.pizzas.items;

export default pizzasSlice.reducer;
