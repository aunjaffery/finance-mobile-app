import moment from "moment";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
} from "../services/database";
import { getDates } from "../services/helper";

const ExpenseStore = (set, get) => ({
  expList: null,
  monthlyTotal: null,
  loading: false,
  addLoading: false,
  error: null,
  fetchExpAsync: async (data) => {
    try {
      set({ loading: true, error: null });
      const rsp = await fetchExpenses(data);
      console.log("fetch expense Zus -->", rsp);
      let groupDate;
      let calMonthly;
      if (rsp && rsp.length) {
        calMonthly = rsp.reduce((total, cur) => {
          return (total += cur.amount);
        }, 0);
        groupDate = rsp.reduce(function (val, obj) {
          let comp = moment(obj["date"]).format("DD MMM");
          (val[comp] = val[comp] || []).push(obj);
          return val;
        }, {});
      } else {
        groupDate = null;
        calMonthly = 0;
      }
      set({
        loading: false,
        expList: groupDate,
        monthlyTotal: calMonthly,
        error: null,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false, error: error });
    }
  },
  addExpAsync: async (data) => {
    try {
      set({ addLoading: true });
      console.log("ADD -->", data);
      await createExpense(data);
      await get().fetchExpAsync(getDates());
      set({ addLoading: false });
    } catch (error) {
      set({ addLoading: false });
      throw "Error! Cannot create expense";
    }
  },
  delExpAsync: async (id) => {
    try {
      console.log("deleteing expense -->", id);
      await deleteExpense(id);
      await get().fetchExpAsync(getDates());
    } catch (error) {
      console.log("Del error -->", error);
      throw "Error! Cannot delete expense";
    }
  },
});

export default ExpenseStore;
