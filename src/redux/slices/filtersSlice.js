import { createSlice } from "@reduxjs/toolkit";



const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        category: 0,
        sortBy: 0,
    },
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        }
    }
});

export const selectCategory = (state) => state.filters.category;
export const selectSortBy = (state) => state.filters.sortBy;
export const {setSortBy, setCategory} = filtersSlice.actions;
export default filtersSlice.reducer;