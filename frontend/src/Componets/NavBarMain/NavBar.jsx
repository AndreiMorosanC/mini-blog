
  /*import { useState } from "react";
import BtnCreateBlog from "../BtnCreateBlogMain/BtnCreateBlog";
import BtnUserProfile from "../BtnUserProfileMain/BtnUserProfile";
import { useAuth } from "../../hooks/useAuth ";
import BtnSignUp from "../BtnSignUpMain/BtnSignUp";
import Logo from "../../imgMain/Logo.png";
import { Link, useLocation } from "react-router-dom";
import BtnLogin from "../BtnLoginMain/BtnLogin";



const NavBar = () => {
  const { user, token, loading } = useAuth();
  const { pathname } = useLocation();
  const hideOn = ["/Signup", "/Login"];

  return (
    <div>
      {user ? (
        <>
          <nav className="flex items-center justify-between pt-2 border-b-1 border-white ">
            <Link to={"/"}>
              <img src={Logo} alt="" className="h-10 w-auto" />
            </Link>
            <ul className="flex flex-row gap-10">
              <li>
                <BtnCreateBlog />
              </li>
              <li>
                <BtnUserProfile />
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <ul className="flex flex-row justify-baselines">
            <li>
              <Link to={"/"}>
                <img src={Logo} alt="" className="h-10 w-auto" />
              </Link>
            </li>
            {!hideOn.includes(pathname) && (
              <div>
                <li>
                  <BtnSignUp />
                </li>
                <li>
                  <BtnLogin/>
                </li>
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
};*/
// src/components/NavBar/NavBar.jsx
import { Fragment } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth ";
import Logo from "../../imgMain/Logo.png";



export default function NavBar() {
  const { user } = useAuth();
  const { pathname } = useLocation(); 

  // Rutas que NO queremos mostrar el botón “Sign up” / “Login”
  const hideOn = ["/signup", "/login"];

  // Items de navegación cuando estás logueado
  const authNav = [
    { name: "Home", to: "/" },
    { name: "Nuevo blog", to: "/createNewBlogPage" },
    { name: "Perfil", to: "/UserProfile" },
  ];

  // Items de navegación cuando NO estás logueado
  const guestNav = [
    { name: "Home", to: "/" },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <Disclosure as="nav" className="relative bg-[#190c9d] text-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Mobile hamburger */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[#163c67] focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">
                    {open ? "Cerrar menú" : "Abrir menú"}
                  </span>
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/">
                  <img src={Logo} alt="logo" className="h-8 w-auto" />
                </Link>
              </div>

              {/* Desktop nav */}
              <div className="hidden sm:flex sm:space-x-4">
                {(user ? authNav : guestNav).map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={classNames(
                      pathname === item.to
                        ? "bg-[#163c67] text-white"
                        : "hover:bg-[#163c67] hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right side: campana o SignUp/Login */}
              <div className="flex items-center">
                {user ? (
                  <button className="p-1 rounded-full hover:bg-[#163c67] focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Mostrar notificaciones</span>
                    <BellIcon className="h-6 w-6" aria-hidden />
                  </button>
                ) : (
                  !hideOn.includes(pathname) && (
                    <Link
                      to="/signup"
                      className="ml-4 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium"
                    >
                      Regístrate / Login
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden bg-[#190c9d]">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {(user ? authNav : guestNav).map((item) => (
                <Disclosure.Button
                  key={item.to}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    pathname === item.to
                      ? "bg-[#163c67] text-white"
                      : "hover:bg-[#163c67] hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {/* Si no está logueado, botón adicional */}
              {!user && !hideOn.includes(pathname) && (
                <Disclosure.Button
                  as={Link}
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
