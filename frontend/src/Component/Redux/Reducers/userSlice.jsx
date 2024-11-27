import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    role_id: localStorage.getItem("role_id"),
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setRole_id: (state, action) => {
      state.role_id = action.payload;
      localStorage.setItem("role_id", action.payload);
    },
  },
});

export const { setUserToken, setUserId, setRole_id } = userSlice.actions;
export default userSlice.reducer;
