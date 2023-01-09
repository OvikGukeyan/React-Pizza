import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SortBy = {
    name: string;
    type: string,
    order: string
}

export interface FilterSliceState {
    category: number | null,
    sortBy: SortBy
    currentPage: number
}

const initialState: FilterSliceState = {
    category: null,
    sortBy: {
        name: 'popular',
        type: 'popular',
        order: 'desc'
    },
    currentPage: 1
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<SortBy>) => {
            state.sortBy = action.payload
        },
        setCategory: (state, action: PayloadAction<number | null>) => {
            state.category = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.sortBy.type = String(action.payload.sortBy.type);
            state.sortBy.order = String(action.payload.sortBy.order);
            state.sortBy.name = String(action.payload.sortBy.name);
            state.category = action.payload.category ? Number(action.payload.category) : null;
            state.currentPage = Number(action.payload.currentPage);
        }
    }
});

export const selectCategory = (state: RootState) => state.filters.category;
export const selectSortBy = (state: RootState) => state.filters.sortBy;
export const selectCurrentPage = (state: RootState) => state.filters.currentPage;
export const { setSortBy, setCategory, setCurrentPage, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;