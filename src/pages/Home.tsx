import { useCallback, useEffect, useRef } from 'react';
import { Categories, Loading, SortPopup, Pagination, PizzaBlock } from '../components';
import { useSelector } from 'react-redux';
import { selectPizzas, fetchPizzas } from '../redux/slices/pizzasSlice';
import { setCategory, setSortBy, setCurrentPage, setFilters, SortBy, FilterSliceState, selectFilters } from '../redux/slices/filtersSlice';
import { CartItem, selectCart, setCartItems } from '../redux/slices/cartSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';


export const Home = () => {

    const { sortBy, category, searchValue, currentPage } = useSelector(selectFilters);

    const { cartItems } = useSelector(selectCart);

    const { isLoaded, loadingRejected, pizzaItems } = useSelector(selectPizzas)


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isMounted = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchPizzas({ sortBy, category, searchValue, currentPage }));
    }, [category, sortBy, searchValue, currentPage]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;
            dispatch(setFilters(params))
        }
    }, [])


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy,
                category,
                currentPage
            }, { skipNulls: true })
            navigate(`/?${queryString}`);
        }
        isMounted.current = true;
    }, [category, sortBy, currentPage]);



    

    const handleChoicePopup = useCallback((obj: SortBy) => {
        dispatch(setSortBy(obj))
    }, [])

    const handleChoiceCategorie = useCallback((index: number | null) => {
        dispatch(setCategory(index))
    }, [])

    const onAddPizza = (obj: CartItem) => {
        dispatch(setCartItems(obj))
    }

    const onChangePage = useCallback((value: number) => {
        dispatch(setCurrentPage(value))
    }, [])


    return (
        <div className="container">

            <div className="content__top">
                <Categories
                    category={category}
                    handleChoiceCategorie={handleChoiceCategorie}
                />
                <SortPopup
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
                {isLoaded ? pizzaItems
                    .map((obj) => (
                        <PizzaBlock
                            onAddPizza={onAddPizza}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}
                        />
                    )) : [...Array(10)].map((_, index) => <Loading key={index} />)}

            </div>)}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />

        </div>
    )
}
