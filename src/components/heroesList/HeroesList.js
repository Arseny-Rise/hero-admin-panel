import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetched, fetchHeroes, filtredHeroesSelector } from './heroesSlice';

const HeroesList = () => {
    // const { heroes, currentFilter } = useSelector((state) => state);

    const filtredHeroes = useSelector(filtredHeroesSelector);
    const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
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
        if (!arr || arr.length === 0) {
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
