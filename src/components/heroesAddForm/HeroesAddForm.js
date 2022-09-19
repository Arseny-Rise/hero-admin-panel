import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroesFetched } from '../heroesList/heroesSlice';
import { useHttp } from '../../hooks/http.hook';

const HeroesAddForm = () => {
    const heroes = useSelector((state) => {
        return state.heroes.heroes;
    });
    const filters = useSelector((state) => {
        return state.filters.filters;
    });
    const dispatch = useDispatch();
    const { request } = useHttp();

    // console.log(heroes, filters);

    const addNewHero = (values) => {
        const newHero = { ...values };
        newHero.id = uuidv4();

        const newArr = [...heroes, newHero];
        dispatch(heroesFetched(newArr));

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero)).then((res) => {
            console.log(res);
            console.log('Completed');
        });
    };

    const optionsForm = filters.map((item) => (
        <option key={item} value={item[0]}>
            {item[0]}
        </option>
    ));

    return (
        <Formik
            initialValues={{ name: '', description: '', element: '' }}
            validationSchema={Yup.object().shape({
                name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
                description: Yup.string()
                    .min(2, 'Too Short!')
                    .max(70, 'Too Long!')
                    .required('Required'),
                element: Yup.string()
                    .oneOf(['fire', 'water', 'wind', 'earth'], 'Required element')
                    .required('Required'),
            })}
            onSubmit={(values) => addNewHero(values)}
        >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">
                        Имя нового героя
                    </label>
                    <Field
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?"
                    />
                    <ErrorMessage name="name" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label fs-4">
                        Описание
                    </label>
                    <Field
                        as="textarea"
                        required
                        name="description"
                        className="form-control"
                        placeholder="Что я умею?"
                        style={{ height: '130px' }}
                    />
                    <ErrorMessage name="description" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">
                        Выбрать элемент героя
                    </label>
                    <Field as="select" required className="form-select" id="element" name="element">
                        {/* <option>Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option> */}
                        {optionsForm}
                    </Field>
                    <ErrorMessage name="element" component="div" />
                </div>

                <button type="submit" className="btn btn-primary">
                    Создать
                </button>
            </Form>
        </Formik>
    );
};

export default HeroesAddForm;
