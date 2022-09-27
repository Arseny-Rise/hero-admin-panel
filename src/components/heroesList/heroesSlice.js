import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({ heroesLoadingStatus: 'idle' });

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetched: (state, action) => {
            // state.heroes = action.payload;
            heroesAdapter.setAll(state, action.payload);
            state.heroesLoadingStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
                // state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
                console.log(initialState);
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filtredHeroesSelector = createSelector(
    (state) => state.filters.currentFilter,
    selectAll,
    (currentFilter, heroes) => {
        if (currentFilter === 'all') {
            return heroes;
        } else {
            return heroes.filter((item) => item.element === currentFilter);
        }
    }
);

export const { heroesFetching, heroesFetched, heroesFetchingError } = actions;
