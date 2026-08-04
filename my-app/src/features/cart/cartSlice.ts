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

      updateCartPrice(state);
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

      updateCartPrice(state);
    },
    addToCartWithQuantity: (state, action: PayloadAction<productType & {quantity: number;}>) => {
      const product = action.payload;
      console.log(action.payload)
      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );

      if(existingItem) {
        existingItem.quantity += product.quantity;
      }else{
        state.items.push({
          ...product
        })
      }

      updateCartPrice(state);
    },
    removeItem(state, action: PayloadAction<number>) {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload,
      );

      if (index < 0) return;

      state.items.splice(index, 1);
      updateCartPrice(state);
    },
  }
})

const updateCartPrice = (state: CartState) => {
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
}

export const { addToCart, updateCart, addToCartWithQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;