import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 max-w-6xl mx-auto ">
      {products.map(p => (
        <div
          key={p.id}
          className="flex flex-col justify-between border p-4 rounded shadow bg-white dark:bg-slate-800 dark:text-white"
        >
          <div>
            <img src={p.image} alt={p.name} className="w-full h-40 object-contain mb-4" />
            <h3 className="text-lg font-bold mb-1">{p.name}</h3>
            <p className="text-sm mb-2">{p.description}</p>
            <p className="text-base font-bold mb-4">${p.price}</p>
          </div>

          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-auto"
            onClick={() => addToCart(p)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
