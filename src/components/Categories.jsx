import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../redux/slices/filtersSlice";
import { setCategory } from "../redux/slices/filtersSlice";

export const Categories = ({ items }) => {
    const dispatch = useDispatch();
    const category = useSelector(selectCategory);


    const choiceCategories = (index) => {
        dispatch(setCategory(index))
    }

    return (
        <div className="categories">

            <ul>
                <li className={category === null && 'active'} onClick={() => choiceCategories(null)}>Все</li>
                {items &&
                    items.map((item, index) => (
                        <li
                            onClick={() => choiceCategories(index)}
                            className={index === category ? 'active' : ''}
                            key={`${item}_${index}`}
                        >{item}</li>
                    ))}
            </ul>
        </div>
    )
}