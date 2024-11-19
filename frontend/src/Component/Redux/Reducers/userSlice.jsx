import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  },
  reducers: {
    userToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    user_id: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", userId);
    },
  },
});

export const { userToken, user_id } = userSlice.actions;
export default userSlice.reducer;
