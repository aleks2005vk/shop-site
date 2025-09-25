import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../Features/api/ApiSlice';
import { ROUTES } from '../../utils/routes';
import Product from '../Products/Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../Features/Products/productsSlice';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { items, related } = useSelector(
        state => state.products || { items: [], related: [] },
    );

    const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

    useEffect(() => {
        if (isError) navigate(ROUTES.HOME);
    }, [isError, navigate]);

    useEffect(() => {
        if (!product || !items || items.length === 0) return;
        const pid = product.id ?? product._id;
        if (pid) dispatch(getRelatedProducts(pid));
    }, [product, items, dispatch]);

    useEffect(() => {
        if (!isLoading && !product) {
            navigate(ROUTES.HOME);
        }
    }, [isLoading, product, navigate]);

    if (isLoading) return <p>Loading...</p>;
    if (!product) return null;

    const images =
        product.images && product.images.length > 0
            ? product.images
            : product.image
              ? [product.image]
              : [];

    // формируем список related с текущим продуктом первым, удаляя возможные дубликаты
    const currentId = product.id ?? product._id;
    const relatedWithoutCurrent = (related || []).filter(
        p => (p.id ?? p._id) !== currentId,
    );
    const relatedList = [product, ...relatedWithoutCurrent];

    return (
        <>
            <Product
                id={currentId}
                title={product.title}
                description={product.description}
                price={product.price}
                images={images}
            />

            {/* Рендер связанных товаров — текущий товар будет первым */}
            <section style={{ marginTop: 24 }}>
                <h3 style={{ margin: '8px 0' }}>Related products</h3>
                <Products
                    Products={relatedList}
                    amount={relatedList.length}
                    title="Related products"
                />
            </section>
        </>
    );
};

export default SingleProduct;
