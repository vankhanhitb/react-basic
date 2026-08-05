import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../features/cart/modalSlide";
import type { RootState } from "../../store/store";

import Logo from "../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FiMenu, FiHeart } from "react-icons/fi";
import DarkMode from "./DarkMode";
import Search from "./Search";
import Menu from "./Menu";

type PropsHeader = {
  toggleMenu: () => void
}

export default function Header({ toggleMenu }: PropsHeader) {
  const [sticky, setSticky] = useState(false);
  const stickyRef = useRef(null);
  const itemCount = useSelector((state: RootState) => state.cart.item_count);
  const wishList = useSelector((state: RootState) => state.wishList.items);
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
            <button
              onClick={toggleMenu}
              type="button"
              className="block md:hidden cursor-pointer dark:text-white"
            >
              <FiMenu className="w-10 text-2xl" />
            </button>
            <a href="/" className="flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              <span className="font-bold sm:text-3xl text-2xl uppercase">BiShop</span>
            </a>
          </div>
          
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar */}
            <Search />
            {/* Order Button */}
            <button
            onClick={() => dispatch(showModal())}
            className="relative bg-linear-to-r from-primary to-secondary transition-all duration-20 py-1 px-4 rounded-full flex items-center gap-3 group cursor-pointer"
            >
              <FaCartShopping className="relative z-2 text-xl drop-shadow-sm cursor-pointer" />
              <span className="min-w-5 text-[12px] absolute z-3 -top-1 -right-1 text-black font-bold border-gray-300 rounded-full transition-all duration-200 bg-amber-500">{itemCount ? itemCount : 0}</span>
            </button>
            {/* WishList */}
            <button
              className="w-9 h-9 relative flex justify-center items-center rounded-full bg-primary cursor-pointer"
            >
              <FiHeart />
              <span className="min-w-5 text-[12px] absolute z-3 top-0 -right-1 text-black font-bold border-gray-300 rounded-full transition-all duration-200 bg-amber-500">{ wishList.length > 0 ? wishList.length : 0 }</span>
            </button>
            {/* Darkmode Switch */}
            <div className="hidden sm:block">
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
      {/* Menus */}
      <div className="hidden md:flex justify-center mt-3">
        <Menu />
      </div>
    </div>
  )
}
