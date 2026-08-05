import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import type {
  AppDispatch,
  RootState
} from "../store/store";

import { clearWishListNotification, } from "../features/wishlist/wishlistSlice";

export default function WishListAnnounce() {
  const dispatch = useDispatch<AppDispatch>();

  const notification = useSelector(
    (state: RootState) => state.wishList.notification,
  );

  useEffect(() => {
    if(!notification) return;

    const timeoutId = window.setTimeout(() => {
      dispatch(clearWishListNotification(notification.id));
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId);
    }

  }, [dispatch, notification]);

  if (!notification) return null;

  const wasAdded = notification?.type === "added";

  const message = wasAdded
    ? `You added "${notification?.productName}" to your wishlist.`
    : `You removed "${notification?.productName}" from your wishlist.`;

  return(
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`
        fixed bottom-4 left-4 right-4 z-99
        rounded-xl border px-5 py-4
        text-sm font-semibold shadow-xl
        sm:left-auto sm:w-full sm:max-w-sm
        ${
          wasAdded
            ? "border-green-300 bg-green-50 text-green-800"
            : "border-red-300 bg-red-50 text-red-800"
        }
      `}
    >
      {message}
    </div>
  )
}
