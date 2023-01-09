import React, { useEffect, useContext, useRef } from 'react';
import { Categories, Loading, SortPopup, Pagination, PizzaBlock } from '../components';
import { useSelector } from 'react-redux';
import { selectPizzas, selectIsLoaded, selectLoadingRejected, fetchPizzas } from '../redux/slices/pizzasSlice';
import { selectCategory, selectSortBy, setCategory, setSortBy, selectCurrentPage, setCurrentPage, setFilters, SortBy, FilterSliceState } from '../redux/slices/filtersSlice';
import { CartItem, selectCartItems, setCartItems } from '../redux/slices/cartSlice';
import { searchContext } from '../App';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';


export const Home = () => {
    const { searchValue } = useContext(searchContext);
    const currentPage = useSelector(selectCurrentPage);
    const cartItems = useSelector(selectCartItems);
    const isLoaded = useSelector(selectIsLoaded);
    const loadingRejected = useSelector(selectLoadingRejected)
    const category = useSelector(selectCategory);
    const sortBy = useSelector(selectSortBy);
    const pizzas = useSelector(selectPizzas);
    const categoryNames: string[] = ['Meat', 'Vegeterian', 'Grill', 'Spicy', 'Closed'];
    type SortItemsTypes = {name: string; type: string; order: string};
    const sortItems: SortItemsTypes[] = [
        { name: 'popular', type: 'rating', order: 'desc' },
        { name: '-popular', type: 'rating', order: 'asc' },
        { name: 'price', type: 'price', order: 'desc' },
        { name: '-price', type: 'price', order: 'asc' },
        { name: 'alphabet', type: 'name', order: 'asc' },
        { name: '-alphabet', type: 'name', order: 'desc' },

    ]
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isParam = useRef(false);
    const isMounted = useRef(false);

    //We check the presence of parameters in the url, if they are, write them to redux
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;
            dispatch(setFilters(params))
            isParam.current = true;
        }
    }, [])
    //We check the absence of the parameters of the yurl, in case of absence we make a request for pizzas. If they are, the request will happen on the next render.Making the page scroll up.
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isParam.current) { dispatch(fetchPizzas({ sortBy, category, searchValue, currentPage })) };
        isParam.current = false;
    }, [category, sortBy, searchValue, currentPage]);

    //We check whether the url parameters were recorded, if yes, we write them in the address bar
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy,
                category,
                currentPage
            })
            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [category, sortBy, currentPage]);

    const handleChoicePopup = (obj: SortBy) => {
        dispatch(setSortBy(obj))
    }

    const handleChoiceCategorie = (index: number | null) => {
        dispatch(setCategory(index))
    }

    const onAddPizza = (obj: CartItem) => {
        dispatch(setCartItems(obj))
    }

    const onChangePage = (value: number) => {
        dispatch(setCurrentPage(value))
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
            {loadingRejected ? (
                <div className='content__rejected'>
                    <h1>Something went wrong. Please try again later.😕</h1>
                </div>
            ) : (<div className="content__items">
                {isLoaded ? pizzas
                    .map((obj) => (
                        <PizzaBlock
                            onAddPizza={onAddPizza}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}
                        />
                    )) : [...Array(10)].map((_, index) => <Loading key={index} />)}

            </div>)}

            <Pagination onChangePage={onChangePage} />

        </div>
    )
}
