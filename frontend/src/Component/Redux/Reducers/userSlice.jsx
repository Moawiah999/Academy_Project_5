import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userId: null,
    email: '',
    password: '',
    errorMessage: null,
  },
  reducers: {
    userToken: (state, action) => {
      state.token = action.payload;
    },
    user_id: (state, action) => {
      state.userId = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null; 
    },
  },
});

export const { userToken, user_id, setErrorMessage, setEmail, setPassword, clearErrorMessage } = userSlice.actions;

export default userSlice.reducer;