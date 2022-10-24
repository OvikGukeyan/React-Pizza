export const Categories = ({ items, helnleChoiceCategorie, category }) => {
    return (
        <div className="categories">

            <ul>
                <li className={category === null && 'active'} onClick={() => helnleChoiceCategorie(null)}>Все</li>
                {items &&
                    items.map((item, index) => (
                        <li
                            onClick={() => helnleChoiceCategorie(index)}
                            className={index === category ? 'active' : ''}
                            key={`${item}_${index}`}
                        >{item}</li>
                    ))}
            </ul>
        </div>
    )
}