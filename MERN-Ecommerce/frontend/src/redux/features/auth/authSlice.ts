import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
};

type AuthState = {
  userInfo: UserInfo | null;
};

const getStoredUserInfo = (): UserInfo | null => {
  const storedUserInfo = localStorage.getItem("userInfo");

  if (!storedUserInfo) {
    return null;
  }

  try {
    return JSON.parse(storedUserInfo) as UserInfo;
  } catch {
    localStorage.removeItem("userInfo");
    return null;
  }
};

const initialState: AuthState = {
  userInfo: getStoredUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", String(expirationTime));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// Temporary compatibility alias for code using the earlier misspelling.
export const setCredientials = setCredentials;

export default authSlice.reducer;
