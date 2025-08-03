import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth ';
import React, { useMemo, useState } from 'react';
import logo from '../../assets/logo.png';

const NavBarV2 = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="">
      <div className="hidden sm:block flex flex-col  w-[100%] h-15 bg-[#000D2D] items-center mb-10">
        <div className="flex flex-row justify-between w-[100%] h-[100%]  align-middle text-center">
          <NavLink to="/" className="w-35 ml-10">
            <img src={logo} alt="Logo" className="-mt-7" />
          </NavLink>

          <div className="mr-90 flex flex-row gap-10 items-center justify-center w-100 text-white ">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'px-3 py-2  rounded-md text-sm font-medium',
                    isActive
                      ? 'font-sans uppercase tracking-widest text-white font-normal'
                      : 'font-sans uppercase tracking-widest text-white font-normal',
                  ].join(' ')
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <hr className="hidden sm:block w-[65%] border-t-1 border-white rounded mx-auto mt-2 " />
      </div>
      <div className="sm:hidden flex items-center justify-end w-full pr-4 ">
        
        {isOpen && (
        <div className="sm:hidden flex flex-col gap-4 px-4 pb-4 mt-3 text-white">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md font-sans uppercase tracking-widest text-white font-normal hover:bg-[#00123f]"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="text-white mt-5">
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBarV2;
