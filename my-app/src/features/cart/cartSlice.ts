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
    updateCart: (state, action: PayloadAction<{productId: number, type: string}>) => {
      const { productId, type } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId,
      );

      if (!existingItem) return;

      if (type === "increase") {
        existingItem.quantity += 1;
      }

      if (type === "minus") {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.productId !== productId,
          );
        }
      }

      state.item_count = state.items.reduce(
        (count, item) => count + item.quantity,
        0,
      );

      state.total_price = state.items.reduce(
        (total, item) =>
          total +
          Number(
            item.price.onSalePrice ?? item.price.salePrice,
          ) *
            item.quantity,
        0,
      );

      // switch(type){
      //   case "increase":
      //     state.items.filter((item) => {
      //       return item.productId === productId ? item.quantity += 1 : "";
      //     });

      //     state.total_price = state.items.reduce((total, item) => {
      //       return total + Number(item.price.salePrice ?? item.price.onSalePrice)*item.quantity;
      //     }, 0)
      //   break;

      //   case "minus":
      //     state.items.filter((item) => {
      //       if(item.productId === productId && item.quantity > 1 ){
      //         return item.quantity -= 1
      //       }else if(item.productId === productId && item.quantity === 1 ){
      //         return item.productId !== productId
      //       }
      //     })

      //     state.item_count = state.items.reduce((count, item) => {
      //       return count + item.quantity;
      //     }, 0)

      //     state.total_price = state.items.reduce((total, item) => {
      //       return total + Number(item.price.salePrice ?? item.price.onSalePrice)*item.quantity;
      //     }, 0)
      //     console.log(state);
      //   break;
      // }
    }

    // resetCart: (state:initialType[]) => {
    //   console.log(state);
    // }
  }
})

export const { addToCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;