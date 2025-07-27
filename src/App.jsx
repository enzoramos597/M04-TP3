import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer';

const App = () => {
  return (
    <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen transition bg-white dark:bg-gray-900">
          <Header />
          <ProductList />
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
