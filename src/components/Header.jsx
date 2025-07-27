import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import logo from '../assets/react.svg'; // Asegúrate de que esta ruta sea correcta

const Header = () => {
  const { products, totalAmount, increase, decrease, remove } = useContext(CartContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showCart, setShowCart] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil

  const toggleMenu = () => { // Función para alternar el menú móvil
    setIsOpen(!isOpen);
    // Cierra el carrito cuando se abre/cierra el menú móvil, para evitar superposiciones
    if (showCart) setShowCart(false);
  };

  const navbarLinks = [ // Enlaces de navegación
    { id: 1, title: "Inicio", link: "/" },
    { id: 2, title: "Nosotros", link: "/" },
    { id: 3, title: "Contacto", link: "/" },
    { id: 4, title: "Soporte", link: "/" }
  ];

  return (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-10 dark:bg-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* LOGO y TÍTULO de E-Tienda */}
        <div className='flex items-center gap-2'>
          <img
            src={logo}
            alt="LogoJS"
            className='w-[40px] p-0.5' // Ajustado el tamaño para que sea más pequeño en el header principal
          />
          <h1 className='text-white font-bold text-2xl'>E-Tienda</h1>
        </div>
        {/* FIN LOGO y TÍTULO */}

        {/* NAVEGACIÓN LINKS DESKTOP - MOVEMOS ESTE BLOQUE AL CENTRO */}
        <div className='hidden md:block'>
          <ul className='flex space-x-6 px-4'>
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <a href={link.link} className='text-white hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110 inline-block'>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* FIN NAVEGACIÓN LINKS DESKTOP */}

        <div className="flex items-center gap-4">
          {/* Botón de Modo Oscuro (Solo para Desktop) */}
          <button
            className="p-2 bg-slate-700 rounded hover:bg-slate-600 hidden md:block" // Ocultar en móvil
            onClick={() => setDarkMode(prev => !prev)}
          >
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>

          {/* Botón del carrito (con icono) y contador (Solo para Desktop) */}
          <div className="relative  items-center hidden md:flex"> {/* Ocultar en móvil */}
            {/* Mini imágenes de productos */}
            <div className="flex -space-x-2 mr-2">
              {products.slice(0, 3).map((p) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt={p.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>

            {/* Botón del carrito */}
            <button onClick={() => setShowCart(!showCart)} className="relative">
              <i className="bi bi-cart text-2xl"></i>
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full px-2 text-sm">
                {products.reduce((acc, p) => acc + p.quantity, 0)}
              </span>
            </button>
          </div>

          {/* BURGER BUTTON para móvil */}
          <button
            className='md:hidden text-white p-2 cursor-pointer z-50'
            onClick={toggleMenu}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {
                isOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12' //X Icon
                  />
                )
                  : (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16' //burger Icon
                    />
                  )
              }
            </svg>
          </button>
          {/* FIN BURGER BUTTON */}

        </div>
      </div>

      {/* Menú desplegable del carrito (para Desktop, se mantiene en la misma posición) */}
      {showCart && (
        <div className="absolute right-4 mt-4 w-96 bg-white text-black rounded-lg shadow-lg p-4 dark:bg-slate-700 dark:text-white">
          <h2 className="text-xl font-bold">CARRITO</h2>
          {products.length === 0 ? (
            <i className="bi bi-cart text-2xl"> Carrito Vacio.</i>
          ) : (
            <>
              {products.map(p => (
                <div key={p.id} className="flex justify-between items-center border-b py-2">
                  <div className="flex items-center gap-2">
                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" />
                    <span>{p.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => decrease(p.id)} className="bg-red-600 px-2 text-xl rounded-[20%] hover:bg-red-300 flex items-center justify-center h-6 w-6 leading-none">-</button>
                    <span>{p.quantity}</span>
                    <button onClick={() => increase(p.id)} className="bg-green-600 px-1.5 text-xl rounded-[20%] hover:bg-green-300 flex items-center justify-center h-6 w-6 leading-none">+</button>
                  </div>
                  <span>${(p.price * p.quantity).toFixed(2)}</span>
                  <button onClick={() => remove(p.id)} className="text-red-500 ml-2 font-bold">X</button>
                </div>
              ))}
              <div className="text-right mt-2 font-bold">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </>
          )}
        </div>
      )}

      {/* VISTA MOBILE (Menú desplegable) */}
      <div
        className={`md:hidden absolute top-[70px] left-0 w-full bg-gray-800 transition-all duration-300 ease-in-out z-40 flex flex-col ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {/* VISTA MOBILE LINKS */}
        <ul className='flex flex-col px-4 py-2 flex-grow'> {/* flex-grow para empujar los elementos de abajo */}
          {navbarLinks.map((link) => (
            <li key={link.id} className='py-2 text-center'>
              <a
                href={link.link}
                className='text-sm text-white hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110'
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en un enlace
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón de Modo Oscuro para móvil (duplicado y movido al final) */}
        <div className="flex flex-col items-center gap-4 px-4 py-4 border-t border-emerald-400">
            <button
              className="p-2 bg-slate-700 rounded hover:bg-slate-600 w-full"
              onClick={() => {
                setDarkMode(prev => !prev);
                setIsOpen(false); // Cierra el menú al cambiar el tema
              }}
            >
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </button>

            {/* Carrito para móvil (duplicado y movido al final) */}
            <div className="relative flex flex-col items-center w-full">
                <button
                    onClick={() => {
                        setShowCart(!showCart);
                        setIsOpen(false); // Cierra el menú móvil al abrir el carrito
                    }}
                    className="relative p-2 bg-slate-700 rounded hover:bg-slate-600 flex items-center justify-center w-full"
                >
                    <i className="bi bi-cart text-2xl mr-2"></i>
                    <span>Ver Carrito ({products.reduce((acc, p) => acc + p.quantity, 0)})</span>
                    {/* El span del contador si se desea como un badge dentro del botón */}
                    {/* <span className="absolute -top-1 -right-1 bg-white text-black rounded-full px-2 text-sm">
                        {products.reduce((acc, p) => acc + p.quantity, 0)}
                    </span> */}
                </button>
            </div>
        </div>

      </div>
      {/* FIN VISTA MOBILE */}
    </header>
  );
};

export default Header;