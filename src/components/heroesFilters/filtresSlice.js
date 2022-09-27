import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

// const initialState = {
//     filters: [],
//     currentFilter: 'all',
// };

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({ currentFilter: 'all' });

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
    const { request } = useHttp();
    return request('http://localhost:3001/filters');
});

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        currentFilterSetted: (state, action) => {
            state.currentFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            // state.filters = action.payload;
            filtersAdapter.setAll(state, action.payload);
        });
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { filtersFetched, currentFilterSetted } = actions;

export const { selectAll } = filtersAdapter.getSelectors((state) => state.filters);
