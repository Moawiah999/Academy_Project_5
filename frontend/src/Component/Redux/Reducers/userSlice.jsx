import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
 
  },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    }
  },
});

export const { setUserToken, setUserId} = userSlice.actions;
export default userSlice.reducer;