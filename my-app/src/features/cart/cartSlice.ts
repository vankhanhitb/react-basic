import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { productType } from "../../data/products";

type CartItem = productType & {
  quantity: number;
}

export type CartState = {
  items: CartItem[];
  total_price: number;
  item_count: number;
}

const initialState: CartState = {
  items: [],
  total_price: 0,
  item_count: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<productType> ) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );

      if(existingItem) {
        existingItem.quantity += 1;
      }else{
        state.items.push({
          ...product,
          quantity: 1,
        })
      }

      state.item_count = state.items.reduce((count, item) => {
        return count + item.quantity;
      }, 0)

      state.total_price = state.items.reduce((total, item) => {
        return total + Number(item.price.salePrice ?? item.price.onSalePrice)*item.quantity;
      }, 0)
    },
    // removeItem: (state, action: PayloadAction<productType>) => {
    //   console.log(state);
    //   console.log(action);
    // },
    // resetCart: (state:initialType[]) => {
    //   console.log(state);
    // }
  }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;