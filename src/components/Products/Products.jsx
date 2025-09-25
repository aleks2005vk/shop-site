// src/components/Product/Product.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { ROUTES } from '../../utils/routes';
import { addToCart } from '../../Features/user/UserSlice';

const Products = ({ Products = [], amount = 5, title = 'Products' }) => {
    const items = Products.filter((_, index) => index < amount);
		
    return (
        <section className="section products">
            {title && <h2>{title}</h2>}

            <div className="product-list">
                {items.map(
                    ({ id, images, title, category: { name: cat }, price }) => (
                        <Link
                            to={ROUTES.PRODUCT.replace(':id', id)}
                            key={id}
                            className="product-card"
                        >
                            <div className="image">
                                <img
                                    src={
                                        images && images.length > 0
                                            ? images[0]
                                            : 'https://picsum.photos/200/200'
                                    }
                                    alt={title}
                                />
                            </div>
                            <div className="wrapper">
                                <h3>{title || 'No Title'}</h3>
                                <div className="category">
                                    {cat || 'No Category'}
                                </div>
                                <div className="info">${price ?? 'N/A'}</div>
                                <div className="prices">
                                    <div className="price">
                                        {price ?? 'N/A'}$
                                    </div>
                                    <div className="oldprice">
                                        {Math.floor(price * 0.8) ?? 'N/A'}$
                                    </div>
                                </div>
                                <div className='purchases'>
                                    {Math.floor(Math.random() * 20 + 1)} purchased
                                </div>
                            </div>
                        </Link>
                    ),
                )}
            </div>
        </section>
    );
};
export default Products;
