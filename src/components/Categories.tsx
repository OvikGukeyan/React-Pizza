import React from "react";

type CategoriesProps = {
    items: string[];
    handleChoiceCategorie: any;
    category: number;
}

export const Categories: React.FC<CategoriesProps> = ({ items, handleChoiceCategorie, category }) => {
    return (
        <div className="categories">

            <ul>
                <li className={category === null ? 'active' : ''} onClick={() => handleChoiceCategorie(null)}>All</li>
                {items &&
                    items.map((item, index) => (
                        <li
                            onClick={() => handleChoiceCategorie(index)}
                            className={index === category ? 'active' : ''}
                            key={`${item}_${index}`}
                        >{item}</li>
                    ))}
            </ul>
        </div>
    )
}