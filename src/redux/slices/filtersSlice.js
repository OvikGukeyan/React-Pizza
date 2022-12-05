import { createSlice } from "@reduxjs/toolkit";


const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        category: null,
        sortBy: {
            type: 'popular',
            order: 'desc'
        },
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