import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<{isOpen: boolean}> )=>{
      state.isOpen = action.payload.isOpen
    },
    closeModal: (state, action: PayloadAction<{isOpen: boolean}> )=>{
      state.isOpen = action.payload.isOpen
    },
  }
})

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;