import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetched } from './heroesSlice';
import { fetchHeroes } from '../../actions';
import { createSelector } from 'reselect';

const HeroesList = () => {
    // const { heroes, currentFilter } = useSelector((state) => state);

    const heroes1 = createSelector(
        (state) => state.filters.currentFilter,
        (state) => state.heroes.heroes,
        (currentFilter, heroes) => {
            if (currentFilter === 'all') {
                return heroes;
            } else {
                return heroes.filter((item) => item.element === currentFilter);
            }
        }
    );

    const filtredHeroes = useSelector(heroes1);

    const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // dispatch(heroesFetching());
        // request('http://localhost:3001/heroes')
        //     .then((data) => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()));
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (heroesLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const deleteItem = (id) => {
        const newArray = [];
        filtredHeroes.forEach((element) => {
            if (element.id !== id) {
                newArray.push(element);
            }
        });
        dispatch(heroesFetched(newArray));
        request('http://localhost:3001/heroes/' + id, 'DELETE').then((res) => {
            console.log(res);
            console.log('Completed');
        });
    };

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        console.log('renderHeroesList');

        return arr.map(({ id, ...props }) => {
            return (
                // <CSSTransition key={id} timeout={500} classNames="item">
                <HeroesListItem key={id} {...props} deleteItem={() => deleteItem(id)} />
                // </CSSTransition>
            );
        });
    };

    const elements = renderHeroesList(filtredHeroes);
    // return <TransitionGroup component="ul">{elements}</TransitionGroup>;
    return <ul>{elements}</ul>;
};

export default HeroesList;
