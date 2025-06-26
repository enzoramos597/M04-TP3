import logo from '../assets/react.svg';
import React, { useState } from 'react';
//import 'bootstrap-icons/font/bootstrap-icons.css'; // 

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navbarLinks = [
        { id: 1, title: "Inicio", link: "/" },
        { id: 2, title: "Nosotros", link: "/" },
        { id: 3, title: "Contacto", link: "/" },
        { id: 4, title: "Soporte", link: "/" }
    ];

    const navbarRedes = [
        {
            id: 1,
            title: "Instagram",
            link: "https://www.instagram.com",
            icon: "bi bi-cart3",
        },       
    ];

    return (
        // Asegura que el navbar tenga un z-index alto para estar siempre arriba
        <nav className="w-full bg-gray-800 text-white relative z-50">
            {/* View Desktop */}
            <div className='flex justify-between items-center sm:px-12 sm:py-3 px-4 py-2'>
                {/**LOGO */}
                <div className='flex items-center gap-2'>
                    <img
                        src={logo}
                        alt="LogoJS"
                        className='w-[60px] p-0.5'
                    />
                    <p className='text-white font-bold font-size-2xl'>E-Tienda</p>                   
                </div>
                {/**FIN LOGO */}

                {/**BURGER BUTTON */}
                <button
                    //z-index para asegurar que el botón esté por encima de cualquier cosa que pudiera superponerse
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

                {/* NAVEGACIÓN LINKS DESKTOP */}
                <div className='hidden md:block'>
                    <ul className='flex space-x-6 px-4'>
                        {
                            navbarLinks.map((link) => (
                                <li key={link.id}>
                                    <a href={link.link} className='text-white hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110 inline-block'>{link.title}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* FIN NAVEGACIÓN LINKS DESKTOP */}

                {/* NAVEGACIÓN SOCIAL DESKTOP */}
                <div className='hidden md:block'>
                    <ul className='flex space-x-4 px-4'>
                        {
                            navbarRedes.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={link.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className="inline-block transition-transform duration-300 transform hover:scale-125"
                                    >
                                        <i
                                            className={`${link.icon} sm:text-2xl text-lg text-white transition-all duration-300 hover:text-emerald-400`}
                                        ></i>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* FIN NAVEGACIÓN LINKS DESKTOP */}
            </div>

            {/* VISTA MOBILE ----------- */}
            {/* Es crucial que este div también tenga un z-index alto y su posición sea absoluta o fixed */}
            <div
                className={`md:hidden absolute top-[70px] left-0 w-full bg-gray-800 transition-all duration-300 ease-in-out z-40 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                // Si tu navbar principal no es de 70px de alto, ajusta el 'top-[70px]'
                // Y considera usar 'fixed' en lugar de 'absolute' en el navbar principal si quieres que siempre esté visible
            >
                {/* VISTA MOBILE LINKS */}
                <ul className='flex flex-col px-4 py-2'>
                    {navbarLinks.map((link) => (
                        <li key={link.id} className='py-2 text-center'>
                            <a
                                href={link.link}
                                className='text-sm text-white hover:text-emerald-400 transition-transform duration-300 transform hover:scale-110'
                                onClick={() => setIsOpen(false)}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* VISTA MOBILE SOCIAL */}
                <ul className="flex space-x-4 px-4 py-2 border-t border-emerald-400 justify-center">
                    {navbarRedes.map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                                onClick={() => setIsOpen(false)}
                            >
                                <i
                                    className={`${link.icon} text-lg text-white hover:text-emerald-400`}
                                ></i>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* FIN VISTA MOBILE */}
</nav>
  )
}

export default Header
