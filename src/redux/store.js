import { configureStore } from "@reduxjs/toolkit";
import  filters  from "./slices/filtersSlice";
import pizzas from "./slices/pizzasSlice";
import cart from "./slices/cartSlice";

export default configureStore({
    reducer: {
        filters,
        pizzas,
        cart
    }
    
})
