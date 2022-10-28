export const Categories = ({ items, handleChoiceCategorie, category }) => {
    return (
        <div className="categories">

            <ul>
                <li className={category === null ? 'active' : ''} onClick={() => handleChoiceCategorie(null)}>Все</li>
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