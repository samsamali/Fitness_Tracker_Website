import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage safely
const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  currentUser: user,
  isLoggedIn: !!user,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;