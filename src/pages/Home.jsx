import { Categories, Loading, SortPopup } from '../components';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { useSelector, useDispatch } from 'react-redux';
import { selectPizzas, fetchPizzas, selectIsLoaded } from '../redux/slices/pizzasSlice';
import { selectCategory, selectSortBy } from '../redux/slices/filtersSlice';
import { useEffect } from "react";

export const Home = () => {
    const isLoaded = useSelector(selectIsLoaded);
    const category = useSelector(selectCategory);
    const sortBy = useSelector(selectSortBy);
    const pizzas = useSelector(selectPizzas);
    const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const sortItems = [
        { name: 'популярности', type: 'popular', order: 'desc' },
        { name: 'цене', type: 'price', order: 'asc' },
        { name: 'алфавиту', type: 'name', order: 'asc' }
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy])


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    items={categoryNames}
                />
                <SortPopup
                    items={sortItems}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ? pizzas
                    // .filter((item) => item.category === category)
                    .map((obj) => (
                        <PizzaBlock
                            key={obj.id}
                            {...obj}
                        />
                    )) : [...Array(10)].map((_, index) => <Loading key={index} />)}

            </div>
        </div>
    )
}
