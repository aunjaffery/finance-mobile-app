import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense.slice";
import systemSilce from "./system.silce";

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    system: systemSilce,
  },
});
