import { useState } from "react";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const navigationLinkClass = `
  min-w-fit w-full
  flex items-end justify-start gap-2
  transition-transform duration-300
  hover:translate-x-2
`;

const navigationLabelClass = `
  flex-1 text-sm
  origin-left scale-x-0
  transition-transform duration-300
  group-hover:scale-x-100
`;

export default function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => {
    setDropdownOpen((isOpen) => !isOpen);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setDropdownOpen(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      closeSidebar();
      navigate("/login");
    } catch (error) {
      console.error("Unable to log out", error);
    }
  };

  return (
    <div
      className={`
        group z-99 h-screen w-15
        overflow-visible
        bg-black px-2 py-4 text-white shadow-2xl
        transition-[width] duration-300 hover:w-[15%]
        flex flex-col justify-between
        ${showSidebar ? "hidden" : ""}
      `}
    >
      <div className="w-full flex-1 flex flex-col justify-start gap-10 overflow-hidden pt-5">
        <Link
          to="/"
          onClick={closeSidebar}
          className={navigationLinkClass}
        >
          <AiOutlineHome className="w-6.5" size={26} />
          <span className={navigationLabelClass}>Home</span>
        </Link>
        <Link
          to="/shop"
          onClick={closeSidebar}
          className={navigationLinkClass}
        >
          <AiOutlineShopping className="w-6.5" size={26} />
          <span className={navigationLabelClass}>Shop</span>
        </Link>
        <Link
          to="/cart"
          onClick={closeSidebar}
          className={navigationLinkClass}
        >
          <AiOutlineShoppingCart className="w-6.5" size={26} />
          <span className={navigationLabelClass}>Cart</span>
        </Link>
        <Link
          to="/wishlist"
          onClick={closeSidebar}
          className={navigationLinkClass}
        >
          <FaHeart className="w-6.5" size={20} />
          <span className={navigationLabelClass}>Wishlist</span>
        </Link>
      </div>

      {userInfo ? (
        <div className="relative pb-3">
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full truncate text-left text-sm text-white focus:outline-none"
            aria-expanded={dropdownOpen}
          >
            {userInfo.username}
          </button>

          {dropdownOpen && (
            <div className="absolute bottom-full left-0 mb-3 min-w-36 rounded bg-white p-2 text-black shadow-lg">
              <Link
                to="/profile"
                onClick={closeSidebar}
                className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                type="button"
                onClick={logoutHandler}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <AiOutlineLogout size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-3 pb-3">
          <li>
            <Link
              to="/login"
              onClick={closeSidebar}
              className={navigationLinkClass}
            >
              <AiOutlineLogin className="w-6.5" size={26} />
              <span className={navigationLabelClass}>Login</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              onClick={closeSidebar}
              className={navigationLinkClass}
            >
              <AiOutlineUserAdd className="w-6.5" size={26} />
              <span className={navigationLabelClass}>Register</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
