import { useState } from "react";

export const Categories = ({ items }) => {

    const [isActive, setIsActive] = useState(0);

    const choiceCategories = (index) => {
        setIsActive(index)
    }

    return (
        <div className="categories">

            <ul>
                {items &&
                    items.map((item, index) => (
                        <li
                            onClick={() => choiceCategories(index)}
                            className={index === isActive ? 'active' : ''}
                            key={`${item}_${index}`}
                        >{item}</li>
                    ))}
            </ul>
        </div>
    )
}