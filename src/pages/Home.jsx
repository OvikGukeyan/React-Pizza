import { Categories, Loading, SortPopup } from '../components';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { useSelector, useDispatch } from 'react-redux';
import { selectPizzas, fetchPizzas, selectIsLoaded } from '../redux/slices/pizzasSlice';
import { selectCategory, selectSortBy, setCategory, setSortBy } from '../redux/slices/filtersSlice';
import { useEffect } from "react";
import { selectCartItems, setCartItems } from '../redux/slices/cartSlice';

export const Home = () => {
    const cartItems = useSelector(selectCartItems);
    const isLoaded = useSelector(selectIsLoaded);
    const category = useSelector(selectCategory);
    const sortBy = useSelector(selectSortBy);
    const pizzas = useSelector(selectPizzas);
    const categoryNames = ['Meat', 'Vegeterian', 'Grill', 'Spicy', 'Closed']
    const sortItems = [
        { name: 'popular', type: 'popular', order: 'desc' },
        { name: 'price', type: 'price', order: 'asc' },
        { name: 'alphabet', type: 'name', order: 'asc' }
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy]);

    const handleChoicePopup = (type, order) => {
        dispatch(setSortBy(type, order))
    }

    const handleChoiceCategorie = (index) => {
        dispatch(setCategory(index))
    }

    const onAddPizza = (obj) => {
        dispatch(setCartItems(obj))
    }


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    items={categoryNames}
                    category={category}
                    handleChoiceCategorie={handleChoiceCategorie}
                />
                <SortPopup
                    items={sortItems}
                    handleChoicePopup={handleChoicePopup}
                    sortBy={sortBy}
                    
                />
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {isLoaded ? pizzas
                    // .filter((item) => item.category === category)
                    .map((obj) => (
                        <PizzaBlock
                            onAddPizza={onAddPizza}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}
                        />
                    )) : [...Array(10)].map((_, index) => <Loading key={index} />)}

            </div>
        </div>
    )
}
