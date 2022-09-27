import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentFilterSetted, fetchFilters, selectAll } from './filtresSlice';

import store from '../../store';

const HeroesFilters = () => {
    const filters = useSelector(selectAll);
    const currentFilter = useSelector((state) => state.filters.currentFilter);
    console.log(filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
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
                    className={`btn ${filter.style} ${
                        filter.name === currentFilter ? 'active' : ''
                    }`}
                    onClick={() => renderHeroesFiltered(filter.name)}
                >
                    {filter.name}
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
