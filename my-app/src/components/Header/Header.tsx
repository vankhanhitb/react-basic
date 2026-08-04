import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../features/cart/modalSlide";
import type { RootState } from "../../store/store";

import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import DarkMode from "./DarkMode";

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

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const stickyRef = useRef(null);
  const itemCount = useSelector((state: RootState) => state.cart.item_count)
  const dispatch = useDispatch();

  useEffect(() => {
    const setStateSticky = () => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
    setStateSticky();
  }, [sticky])

  return (
    <div 
      ref={stickyRef} 
      className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 sticky top-0 z-40"
    >
      {/* Top Navbar */}
      <div className={`bg-primary/40 py-2 transition-all duration-150 ${sticky ? "opacity-0 unvisible h-0 pointer-events-none": "opacity-100"}`}>
        <div className="container m-auto flex justify-between items-center">
          {/* Logo */}
          <div className="logo flex justify-center items-center">
            <button className="md:hidden lg:hidden sm:block cursor-pointer dark:text-white">
              <FiMenu className="w-10 text-2xl" />
            </button>
            <a href="/" className="flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              <span className="font-bold sm:text-3xl text-2xl uppercase">BiShop</span>
            </a>
          </div>
          
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar */}
            <div className="relative group hidden sm:block">
              <input 
                type="text"
                placeholder="Search..."
                className="w-50 sm:w-50 group-hover:w-75 px-2 py-1 border rounded-full border-gray-300 transition-all duration-300 focus:outline-none focus:border focus:w-75 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            {/* Order Button */}
            <button
            onClick={() => dispatch(showModal())}
            className="relative bg-linear-to-r from-primary to-secondary transition-all duration-20 py-1 px-4 rounded-full flex items-center gap-3 group cursor-pointer"
            >
              <FaCartShopping className="relative z-2 text-xl drop-shadow-sm cursor-pointer" />
              <span className="min-w-5 text-[12px] absolute z-3 -top-1 -right-1 text-black font-bold border-gray-300 rounded-full transition-all duration-200 bg-amber-500">{itemCount ? itemCount : 0}</span>
            </button>
            {/* Darkmode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      {/* Menus */}
      <div className="flex justify-center mt-3">
        <ul className="justify-center items-center gap-4 hidden md:flex">
            {
              Menus.map((item) => (
                <li key={item.id}>
                    <a 
                      href={item.link}
                      className="inline-block px-4 py-3 hover-text-primary duration-200 text-[16px] uppercase"
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
      </div>
    </div>
  )
}
