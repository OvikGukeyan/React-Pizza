import { Categories, SortPopup } from '../components';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { useSelector } from 'react-redux';
import { selectPizzas } from '../redux/slices/pizzasSlice';
import { selectCategory } from '../redux/slices/filtersSlice';


export const Home = () => {
    const category = useSelector(selectCategory);
    const pizzas = useSelector(selectPizzas);
    

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    items={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}
                />
                <SortPopup
                    items={[
                        { name: 'популярности', type: 'popular' },
                        { name: 'цене', type: 'price' },
                        { name: 'алфавиту', type: 'alphabet' }
                    ]}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {pizzas
                // .filter((item) => item.category === category)
                .map((obj) => (
                    <PizzaBlock
                        key={obj.id}
                        {...obj}
                    />
                ))}

            </div>
        </div>
    )
}
