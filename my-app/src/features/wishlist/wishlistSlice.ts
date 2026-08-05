import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type productType } from "../../data/products";

type NotificationType = "added" | "removed";

export type WidhListNotification = {
  id: number;
  type: NotificationType;
  productName: string;
}
type WishListType = {
  items: productType[];
  notification: WidhListNotification | null;
  notificationSequence: number;
}

const initialState: WishListType = {
  items:[],
  notification: null,
  notificationSequence: 0,
}

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    toggleWishList: (state, action: PayloadAction<{product: productType}>) => {
      const { product } = action.payload;
      
      const existsItem = state.items.find((item) => {
        return item.productId === product.productId;
      })

      let notificationType: NotificationType;

      if(existsItem){
        state.items = state.items.filter((item) => {
          return item.productId !== product.productId;
        })
        notificationType = "removed";
      }else{
        state.items.push(product);
        notificationType = "added"
      }

      state.notificationSequence +=1;
      state.notification = {
        id: state.notificationSequence,
        type: notificationType,
        productName: product.name
      };

    },
    clearWishListNotification: (state, action: PayloadAction<number>) => {
      //Prevent an old timer from clearing a newer notification
      if(state.notification?.id === action.payload) {
        state.notification = null;
      }
    },
  }
});

export const { toggleWishList, clearWishListNotification } = wishListSlice.actions;
export default wishListSlice.reducer;
