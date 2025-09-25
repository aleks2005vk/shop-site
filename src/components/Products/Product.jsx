import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { addToCart } from '../../Features/user/UserSlice';
import { useDispatch } from 'react-redux';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const Product = ({ id, _id, title, price, description, images = [] }) => {
  const [currentImage, setCurrentImage] = useState(
    images.length > 0 ? images[0] : 'https://picsum.photos/300/300'
  );
  const [currentSize, setCurrentSize] = useState(SIZES[0]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productId = id ?? _id;
    const payload = {
      id: productId,
      title,
      price,
      description,
      images,
      size: currentSize,
      quantity: 1,
    };

    console.log('addToCart payload', payload);
    dispatch(addToCart(payload));
  };

  useEffect(() => {
    if (images.length > 0) setCurrentImage(images[0]);
  }, [images]);

  return (
    <section className="section product">
      <div className="images">
        <div className="current">
          <img src={currentImage} alt="Current Product" />
        </div>
        <div className="thumbnails">
          {(images.length > 0 ? images : ['https://picsum.photos/50/50']).map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index}`}
                onClick={() => setCurrentImage(image)}
                style={{ cursor: 'pointer', width: 50, marginRight: 5 }}
              />
            )
          )}
        </div>
      </div>

      <div className="product-info">
        <h2>{title || 'No Title'}</h2>
        <p className="description">{description || 'No description available'}</p>
        <p>
          <strong>Price:</strong> ${price ?? 'N/A'}
        </p>

        <div className="color">
          <span>Color:</span> Green
        </div>

        <div className="size">
          <span>Size:</span>
          <div className="list" role="radiogroup" aria-label="Product sizes" style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setCurrentSize(size)}
                className={`size-item ${currentSize === size ? 'active' : ''}`}
                aria-pressed={currentSize === size}
                style={{
                  padding: '6px 10px',
                  border: currentSize === size ? '2px solid #333' : '1px solid #ccc',
                  background: currentSize === size ? '#f0f0f0' : '#fff',
                  cursor: 'pointer',
                  borderRadius: 4,
                }}
              >
                {size}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 14 }}>Selected: <strong>{currentSize}</strong></div>
        </div>

        <div className="actions" style={{ marginTop: 12 }}>
          <button onClick={handleAddToCart} className="add">Add to Cart</button>
          <button className="favorite" style={{ marginLeft: 8 }}>Add to Favorites</button>
        </div>

        <div className="bottom"></div>
        <div className="purchase">19 people purchased this item</div>

        <Link to={ROUTES.HOME}>Return to store</Link>
      </div>
    </section>
		
  );
};

export default Product;