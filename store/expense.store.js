import moment from "moment";
import { fetchExpenses } from "../services/database";

const ExpenseStore = (set, _) => ({
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
});

export default ExpenseStore;
