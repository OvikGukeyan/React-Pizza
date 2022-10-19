import { configureStore } from "@reduxjs/toolkit";
import  filtersReducer  from "./slices/filtersSlice";
import pizzasSlice from "./slices/pizzasSlice";

export default configureStore({
    reducer: {
        filters: filtersReducer,
        pizzas: pizzasSlice
    }
    
})
