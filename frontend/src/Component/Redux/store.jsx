import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
