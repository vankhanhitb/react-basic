import { useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const Menus = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Top Rated",
    link: "/#services",
  },
  {
    id: 4,
    name: "Kids Wear",
    link: "/#",
  },
  {
    id: 5,
    name: "Mens Wear",
    link: "/#",
  },
  {
    id: 6,
    name: "Electronics",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

type PropsType = {
  isOpenMenu: boolean;
  onClose: () => void;
}

export default function MobileMenu({isOpenMenu, onClose}: PropsType) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = () => {
    onClose();
  }

  return (
    <div
      aria-hidden={!isOpenMenu}
      inert={!isOpenMenu}
      className={`
        w-full h-full fixed inset-0 z-99
        ${
          isOpenMenu
            ? "pointer-events-auto"
            : "pointer-events-none"
        }
      `}
    >
      {/* <div className="mobile-menu__overlay w-full h-full absolute top-0 left-0 z-10 bg-gray-600/50"></div> */}
      <button
        type="button"
        aria-label="Close mobile menu"
        onClick={handleClick}
        className={`
          absolute inset-0 z-10
          bg-gray-600/50
          transition-opacity duration-300
          ${isOpenMenu
            ? "opacity-100"
            : "opacity-0"
          }
        `}
      />
      <div className={`
        relative z-20
        h-dvh w-[min(90vw,37.5rem)]
        bg-white pt-20
        transition-transform
        duration-300 ease-out
        will-change-transform
        ${
          isOpenMenu
          ? "translate-x-0"
          : "-translate-x-full"
        }
      `}>
        <button
          onClick={handleClick}
          type="button"
          aria-label="Close mobile menu"
          className="absolute top-5 right-5 text-2xl p-1 border border-gray-300 rounded-full"
        >
          <FiX />
        </button>
        <ul className="flex flex-col justify-start items-start gap-1">
          {
            Menus.map((item) => (
              <li key={item.id} className="w-full px-5 py-2">
                  <a 
                    href={item.link}
                    className="inline-block hover-text-primary duration-200 text-[16px] uppercase"
                  >
                    {item.name}
                  </a>
              </li>
            ))
          }
          {/* Dropdown */}
          <li className="w-full group relative z-1 cursor-pointer px-5 py-2">
            <a href="#"
              type="button"
              aria-expanded={isDropdownOpen}
              aria-controls="mobile-trending-submenu"
              onClick={() => {
                setIsDropdownOpen((currentValue) => !currentValue);
              }}
              className="flex items-center gap-0.5 text-[16px] uppercase"
            >
              Trending Products 
              <span>
                <FaCaretDown 
                  className={`
                    transition-transform duration-200
                    ${isDropdownOpen ? "rotate-180" : ""}
                  `}
                />
              </span>
            </a>
            <div
              id="mobile-trending-submenu"
              className={`
                grid
                transition-[grid-template-rows,opacity]
                duration-300 ease-out
                ${isDropdownOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                }
              `}
            >
              <div
                aria-hidden={!isDropdownOpen}
                inert={!isDropdownOpen}
                className="overflow-hidden"
              >
                <ul className="pt-2">
                  {
                    DropdownLinks.map((item)=>(
                      <li key={item.id} className="w-full">
                        <a href={item.link}
                          className="inline-block w-full text-sm uppercase rounded-md p-2 hover:bg-primary/20"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
