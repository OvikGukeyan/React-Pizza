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

    const {sortBy, category, searchValue, currentPage} = useSelector(selectFilters);
    
    const {cartItems} = useSelector(selectCart);

    const {isLoaded, loadingRejected, pizzaItems} = useSelector(selectPizzas)
    
    
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

            <Pagination onChangePage={onChangePage} />

        </div>
    )
}
