import { createSlice } from "@reduxjs/toolkit";


const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        category: null,
        sortBy: {
            type: 'popular',
            order: 'desc'
        },
        currentPage: 1
    },
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        }, 
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.sortBy = action.payload.sortBy;
            state.category = action.payload.category ? Number(action.payload.category) : null;
            state.currentPage = Number(action.payload.currentPage);
        }
    }
});

export const selectCategory = (state) => state.filters.category;
export const selectSortBy = (state) => state.filters.sortBy;
export const selectCurrentPage = (state) => state.filters.currentPage;
export const {setSortBy, setCategory, setCurrentPage, setFilters} = filtersSlice.actions;
export default filtersSlice.reducer;