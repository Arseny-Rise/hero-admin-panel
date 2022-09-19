import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    currentFilter: 'all',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetched: (state, action) => {
            state.filters = action.payload;
        },
        currentFilterSetted: (state, action) => {
            state.currentFilter = action.payload;
        },
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersFetched, currentFilterSetted } = actions;
