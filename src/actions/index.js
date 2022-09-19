// import { createAction } from '@reduxjs/toolkit';
import {
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
} from '../components/heroesList/heroesSlice';
import { filtersFetched } from '../components/heroesFilters/filtresSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
    request('http://localhost:3001/filters').then((data) => {
        dispatch(filtersFetched(data));
    });
};

// export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const filtersFetched = createAction('FILTERS_FETCHED');

// export const currentFilterSetted = createAction('CURRENT_FILTER_SETTED');

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING',
//     };
// };

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes,
//     };
// };

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR',
//     };
// };

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters,
//     };
// };

// export const currentFilterSetted = (filter) => {
//     return {
//         type: 'CURRENT_FILTER_SETTED',
//         payload: filter,
//     };
// };
