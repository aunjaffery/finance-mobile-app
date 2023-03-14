import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense.slice";

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },
});
