import { create } from "zustand";
import ExpenseStore from "./expense.store";
import SystemStore from "./System.store";

export const useStore = create((...params) => ({
  ...SystemStore(...params),
  ...ExpenseStore(...params),
}));
