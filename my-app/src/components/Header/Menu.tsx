import React from 'react';

import { FaCaretDown } from "react-icons/fa";

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

export default function Menu() {
  return (
    <>
      <ul className="justify-center items-center gap-4 hidden md:flex">
        {
          Menus.map((item) => (
            <li key={item.id}>
                <a 
                  href={item.link}
                  className="inline-block px-2 py-3 hover-text-primary duration-200 text-[16px] uppercase"
                >
                  {item.name}
                </a>
            </li>
          ))
        }
        {/* Dropdown */}
        <li className="group relative cursor-pointer">
          <a href="#" className="flex items-center gap-0.5 text-[16px] uppercase py-3">
            Trending Products 
            <span>
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </span>
          </a>
          <div className="absolute z-99 hidden group-hover:block w-50 rounded-md bg-white p-2 text-black shadow-md">
            <ul>
              {
                DropdownLinks.map((item)=>(
                  <li key={item.id}>
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
        </li>
      </ul>
    </>
  )
}
