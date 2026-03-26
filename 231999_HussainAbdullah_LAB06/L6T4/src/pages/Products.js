import { useState } from 'react';
import './Pages.css';

const productList = [
  { id: 1, title: 'Wireless Headphones', description: 'High quality sound with noise cancellation.' },
  { id: 2, title: 'Mechanical Keyboard', description: 'RGB backlit keys with tactile feedback.' },
  { id: 3, title: 'USB-C Hub', description: '7-in-1 hub with HDMI, USB, and SD card slots.' },
  { id: 4, title: 'Webcam HD', description: '1080p webcam with built-in microphone.' },
  { id: 5, title: 'Mouse Pad XL', description: 'Extra large desk mat with non-slip base.' },
  { id: 6, title: 'LED Desk Lamp', description: 'Adjustable brightness with USB charging port.' },
];

function Products() {
  const [cart, setCart] = useState([]);

  const addToCart = (title) => {
    setCart([...cart, title]);
  };

  return (
    <div className="page">
      <h1>Products</h1>
      {cart.length > 0 && (
        <p className="cart-info">🛒 Cart: {cart.length} item(s) — {cart.join(', ')}</p>
      )}
      <div className="products-grid">
        {productList.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <button onClick={() => addToCart(p.title)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;