import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";

export const store = configureStore ({
  reducer: {
    cart: cartReducer,
  }
})

//infer the `RootState` and `AppDispatch` types from. the store itseft
export type RootState = ReturnType<typeof store.getState>

// Inferred type: { posts: PostsState, comments: CommentsState, users: UsersState} example
export type AppDispatch = typeof store.dispatch
