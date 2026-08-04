import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type productType } from "../../data/products";

type WishListType = {
  items: productType[]
}

const initialState: WishListType = {
  items:[]
}

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addWishListItem: (state, action: PayloadAction<{product: productType}>) => {
      const { product } = action.payload;
      
      const existsItem = state.items.find((item) => {
        return item.productId === product.productId;
      })

      if(existsItem){
        state.items = state.items.filter((item) => {
          return item.productId !== product.productId;
        })
      }else{
        state.items.push(product);
      }
    },
    removeWishListItem: (state, action: PayloadAction<{product: productType}>) => {
      console.log(state);
      console.log(action);
    }
  }
});

export const { addWishListItem, removeWishListItem } = wishListSlice.actions;
export default wishListSlice.reducer;
