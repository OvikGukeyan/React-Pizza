import { Categories, SortPopup } from '../components';
import {PizzaBlock} from '../components/PizzaBlock/PizzaBlock'



export const Home = () => {
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    items={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}
                />
                <SortPopup
                    items={['популярности', 'цене', 'алфавиту']}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {[...Array(8)].map((arr, index) => (
                    <PizzaBlock key={index} />
                ))}

            </div>
        </div>
    )
}
