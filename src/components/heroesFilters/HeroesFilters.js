import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFilters } from '../../actions';
import { currentFilterSetted } from './filtresSlice';

const HeroesFilters = () => {
    const { filters, currentFilter } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
        // request('http://localhost:3001/filters').then((data) => {
        //     dispatch(filtersFetched(data));
        // });
        // eslint-disable-next-line
    }, []);

    const renderHeroesFiltered = (idx) => {
        dispatch(currentFilterSetted(idx));
    };

    const renderFilters = () =>
        filters.map((filter, idx) => {
            return (
                <button
                    key={idx}
                    className={`btn ${filter[1]} ${filter[0] === currentFilter ? 'active' : ''}`}
                    onClick={() => renderHeroesFiltered(filter[0])}
                >
                    {filter[0]}
                </button>
            );
        });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{renderFilters()}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
