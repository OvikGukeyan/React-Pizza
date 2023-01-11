import React, { useState, useRef, useEffect } from "react";
import { SortBy } from "../redux/slices/filtersSlice";


type SortPopupProps = {
    handleChoicePopup: (obj: SortBy) => void;
    sortBy: SortBy;
}

export const SortPopup: React.FC<SortPopupProps> = React.memo(({ handleChoicePopup, sortBy }) => {

    const sortItems: SortBy[] = [
        { name: 'popular', type: 'rating', order: 'desc' },
        { name: '-popular', type: 'rating', order: 'asc' },
        { name: 'price', type: 'price', order: 'desc' },
        { name: '-price', type: 'price', order: 'asc' },
        { name: 'alphabet', type: 'name', order: 'asc' },
        { name: '-alphabet', type: 'name', order: 'desc' },
    ]

    const [visiblePopup, setVisiblePopup] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        const _e = e as MouseEvent & {
            path: Node[];
        };
        if (sortRef.current) {
            !_e.path.includes(sortRef.current) && setVisiblePopup(false)
        }

    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
        return () => document.body.removeEventListener('click', handleOutsideClick)
    }, [])


    const toggleVisiablePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const choicePopup = (obj: SortBy) => {
        setVisiblePopup(false);
        handleChoicePopup(obj)
    }


    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    className={visiblePopup ? 'rotated' : ''}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sort by:</b>
                <span onClick={toggleVisiablePopup}>{sortItems.find((item) => item.name === sortBy.name)?.name}</span>
            </div>
            {visiblePopup &&
                <div className="sort__popup">
                    <ul>
                        {sortItems.map((obj, index) => (
                            <li
                                onClick={() => choicePopup(obj)}
                                key={`${obj.name}_${index}`} className={obj.name === sortBy.name ? 'active' : ''}
                            >{obj.name}</li>
                        ))}

                    </ul>
                </div>}
        </div>
    )
}
)