import React, { useEffect } from 'react';
import { Poster } from '../../poster/poster';
import Products from '../../Products/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Categories from '../../Categories/Categories';

import { getProducts } from '../../../Features/Products/productsSlice';
import { getCategories } from '../../../Features/Categories/categoriesSlice';

const Home = () => {
    const { items, filtered } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (!items || items.length === 0) return;
        dispatch({ type: 'products/filterByPrice', payload: 100 });
    }, [dispatch, items]);

    return (
        <section className="section home">
            <Poster />
            <Products Products={items} amount={5} title="Trending" />
            <Categories products={categories} amount={5} title="Categories" />
            <Products Products={filtered} amount={5} title="Less than 100$" />
        </section>
    );
};

export default Home;
