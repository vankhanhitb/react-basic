import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isOpen = true
      document.querySelector('html')?.classList.add('overflow-hidden');
    },
    closeModal: (state) =>{ 
      state.isOpen = false
      document.querySelector('html')?.classList.remove('overflow-hidden');
    },
  }
})

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;