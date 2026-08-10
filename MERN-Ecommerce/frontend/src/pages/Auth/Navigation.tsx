import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { userInfor } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutApiCall] = useLoginMutation();

  const toggleDropdown = () => {
    setShowSidebar(!showSidebar);
  }

  const closeSidebar = () => {
    setShowSidebar(false);
  }

  const logoutHandler = async () => {
    try {
      await logOutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div 
    className={`
      w-[4%] z-99
      transition-w
      duration-300
      ${showSidebar ? "hidden" : "flex"} 
      hidden
      group 
      lg:flex flex-col justify-between px-2 py-4 
      text-white bg-black hover:w-[15%] h-screen
      shadow-2xl
    `}>
      <div className="w-full flex flex-col justify-center gap-10 overflow-hidden pt-12">
        <Link to="/" 
          className="
          min-w-fit
          w-full
          flex items-end justify-start gap-2
          transition-transform transform duration-300
          hover:translate-x-2"
        >
          <AiOutlineHome className="w-6.5" size={26} />
          <span 
          className="
            flex-1
            text-sm
            scale-x-0
            transition-all
            duration-300
            group-hover:scale-x-100
          "
          >
            Home
          </span>
        </Link>
        <Link to="/shop" 
          className="
          min-w-fit
          w-full
          flex items-end justify-start gap-2
          transition-transform transform duration-300
          hover:translate-x-2"
        >
          <AiOutlineShopping className="w-6.5" size={26} />
          <span 
          className="
            flex-1
            text-sm
            scale-x-0
            transition-all
            duration-300
            group-hover:scale-x-100
          "
          >
            Shop
          </span>
        </Link>
        <Link to="/cart" 
          className="
          min-w-fit
          w-full
          flex items-end justify-start gap-2
          transition-transform transform duration-300
          hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="w-6.5" size={26} />
          <span 
          className="
            flex-1
            text-sm
            scale-x-0
            transition-all
            duration-300
            group-hover:scale-x-100
          "
          >
            Cart
          </span>
        </Link>
        <Link to="/whishlist" 
          className="
          min-w-fit
          w-full
          flex items-end justify-start gap-2
          transition-transform transform duration-300
          hover:translate-x-2"
        >
          <FaHeart className="w-6.5" size={20} />
          <span 
          className="
            flex-1
            text-sm
            scale-x-0
            transition-all
            duration-300
            group-hover:scale-x-100
          "
          >
            Wishlist
          </span>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className={`flex items-center text-gray-800 focus:outline-none`}
        >
          { userInfor ? <span className="text-white">{userInfor.username}</span> : <></> }
        </button>
      </div>
      <div>
        <ul className="flex flex-col gap-3 pb-3">
          <li>
            <Link to="/login" 
              className="
              min-w-fit
              w-full
              flex items-end justify-start gap-2
              transition-transform transform duration-300
              hover:translate-x-2"
            >
              <AiOutlineLogin className="w-6.5" size={26} />
              <span 
              className="
                flex-1
                text-sm
                scale-x-0
                transition-all
                duration-300
                group-hover:scale-x-100
              "
              >
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link to="/register" 
              className="
              min-w-fit
              w-full
              flex items-end justify-start gap-2
              transition-transform transform duration-300
              hover:translate-x-2"
            >
              <AiOutlineUserAdd className="w-6.5" size={26} />
              <span 
              className="
                flex-1
                text-sm
                scale-x-0
                transition-all
                duration-300
                group-hover:scale-x-100
              "
              >
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
