import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth ';
import React, { useMemo } from 'react';

import Logo from '../../imgMain/Logo.png';

export default function NavBar() {
  const { user } = useAuth();

  // Memoizamos la lista para no recrearla en cada render
  const navItems = useMemo(
    () =>
      user
        ? [
            { name: 'Home', to: '/' },
            { name: 'Nuevo blog', to: '/createNewBlogPage' },
            { name: 'Perfil', to: '/UserProfile' },
          ]
        : [{ name: 'Home', to: '/' }],
    [user],
  );

  return (
    <Disclosure as="nav" className="relative text-white bg-black  border-b-2 border-b-[#7dd3fc] drop-shadow-[0_0_8px_#7dd3fc]">
      {({ open }) => (
        <>
          <div className="mx-auto  px-4 sm:px-6 ">
            <div className="flex h-16 items-center justify-between">
              {/* Hamburger móvil */}
              <Disclosure.Button
                className="sm:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-[#163c67] focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={open}
              >
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden />
                )}
              </Disclosure.Button>

              {/* Logo */}
              <NavLink to="/" className="flex-shrink-0 flex justify-start">
                <img src={Logo} alt="Logo" className="h-8 w-auto " />
              </NavLink>

              {/* Menú de escritorio */}
              <div className='flex justify-center'>
                <div className="hidden sm:flex sm:space-x-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          'px-3 py-2 rounded-md text-sm font-medium',
                          isActive
                            ? ' text-[#e0f7ff] drop-shadow-[0_0_4px_#7dd3fc]'
                            : 'text-[#e0f7ff] drop-shadow-[0_0_4px_#7dd3fc]',
                        ].join(' ')
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                {/* Icono de notificaciones o botón de login */}
                <div className="flex items-center pl-1">
                  {user ? (
                    <button className="p-1 rounded-full  focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Mostrar notificaciones</span>
                      <BellIcon className="h-6 w-6" aria-hidden />
                    </button>
                  ) : (
                    <NavLink
                      to="/signup"
                      className="ml-4 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium"
                    >
                      Regístrate / Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menú móvil */}
          <Disclosure.Panel className="sm:hidden bg-[#190c9d]">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navItems.map((item) => (
                <Disclosure.Button
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'block px-3 py-2 rounded-md text-base font-medium',
                      isActive
                        ? 'bg-[#163c67] text-white'
                        : 'hover:bg-[#163c67] hover:text-white',
                    ].join(' ')
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {!user && (
                <Disclosure.Button
                  as={NavLink}
                  to="/signup"
                  className="block px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium"
                >
                  Regístrate / Login
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
      
    </Disclosure>
    
  );
}
