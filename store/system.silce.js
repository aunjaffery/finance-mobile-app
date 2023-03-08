import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  loading: false,
};
// Redux Toolkit slice
export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      console.log(`Change theme reducer called with ${action.payload}`);
      state.darkMode = action.payload === "dark" ? true : false;
    },
  },
});
export const { changeTheme } = systemSlice.actions;
export default systemSlice.reducer;
