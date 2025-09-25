import React from 'react';
import { Poster } from '../poster/poster';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  // достаем продукты из redux
  const { items } = useSelector((state) => state.products);

  // берём первые 5 товаров (или сколько нужно)
  const list = items.slice(0, 5);

  return (
    <section className='section'>
      <Poster />

      <h2>Featured Products</h2>
      <div className='products'>
        {list.map(({ id, title, image, price }) => (
          <Link to={`/categories/${id}`} key={id} className='product'>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{price} $</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
