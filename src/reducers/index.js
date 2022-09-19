// import { createReducer } from '@reduxjs/toolkit';

// import {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError,
//     filtersFetched,
//     currentFilterSetted,
// } from '../actions';

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     filters: [],
//     currentFilter: 'all',
// };

// const reducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(heroesFetching, (state) => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addCase(heroesFetchingError, (state) => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(filtersFetched, (state, action) => {
//             state.filters = action.payload;
//         })
//         .addCase(currentFilterSetted, (state, action) => {
//             state.currentFilter = action.payload;
//         })
//         .addDefaultCase(() => {});
// });

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading',
//             };
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle',
//             };
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error',
//             };

//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//             };
//         case 'CURRENT_FILTER_SETTED':
//             return {
//                 ...state,
//                 currentFilter: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export default reducer;
