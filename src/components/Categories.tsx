import React from "react";

type CategoriesProps = {
    handleChoiceCategorie: (index: number | null) => void;
    category: number | null;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ handleChoiceCategorie, category }) => {
    
    const items: string[] = ['Meat', 'Vegeterian', 'Grill', 'Spicy', 'Closed'];


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
})

export default Categories;