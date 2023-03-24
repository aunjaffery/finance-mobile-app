import moment from "moment";
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  expByDay,
  expByMonth,
  expByCat,
} from "../services/database";
import {
  dayObj,
  getPrevMonth,
  getPrevYear,
  mFmt,
  monthObj,
} from "../services/helper";

const ExpenseStore = (set, get) => ({
  expList: null,
  monthlyTotal: null,
  loading: false,
  addLoading: false,
  error: null,
  dayGraph: [],
  monthGraph: [],
  graphLoading: false,
  selectedMon: moment().format(mFmt),
  setSelectedMon: async (month) => {
    set({ selectedMon: month });
    await get().fetchExpAsync();
  },
  catLoading: false,
  catGraph: [],
  fetchExpAsync: async () => {
    console.log("this >", get().selectedMon);
    try {
      set({ loading: true, error: null });
      const rsp = await fetchExpenses(get().selectedMon);
      let groupDate;
      let calMonthly;
      if (rsp && rsp.length) {
        calMonthly = rsp.reduce((total, cur) => {
          let t = (total += cur.amount);
          let f = parseFloat(t.toFixed(2));
          return f;
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
      set({ loading: false, error: error, expList: null });
    }
  },
  addExpAsync: async (data) => {
    try {
      set({ addLoading: true });
      console.log("ADD -->", data);
      await createExpense(data);
      await get().fetchExpAsync();
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
      await get().fetchExpAsync();
    } catch (error) {
      console.log("Del error -->", error);
      throw "Error! Cannot delete expense";
    }
  },
  getExpDayGraph: async () => {
    console.log("Called by day graph ==>");
    try {
      set({ graphLoading: true });
      let dayGraph = await expByDay(getPrevMonth());
      if (dayGraph && dayGraph.length) {
        let ar = dayObj().map((x) => {
          let find = dayGraph.find((f) => x.date === f.date);
          find ? (x.sum = find?.sum) : (x.sum = 0);
          return x;
        });
        set({ dayGraph: ar, graphLoading: false });
      } else {
        set({ dayGraph: [], graphLoading: false });
      }
    } catch (error) {
      set({ graphLoading: false });
      console.log(error);
    }
  },
  getExpMonthGraph: async () => {
    console.log("Called by month graph ==>");
    try {
      set({ graphLoading: true });
      let monthGraph = await expByMonth(getPrevYear());
      if (monthGraph && monthGraph.length) {
        let ar = monthObj().map((x) => {
          let find = monthGraph.find((f) => x.date === f.date);
          find ? (x.sum = find?.sum) : (x.sum = 0);
          return x;
        });
        set({ monthGraph: ar, graphLoading: false });
      } else {
        set({ monthGraph: [], graphLoading: false });
      }
    } catch (error) {
      set({ graphLoading: false });
      console.log(error);
    }
  },
  getExpByCat: async (mon) => {
    console.log("Called by Cat graph ==>");
    try {
      set({ catLoading: true });
      let rsp = await expByCat(mon);
      if (rsp && rsp.length) {
        set({ catGraph: rsp, catLoading: false });
      } else {
        set({ catGraph: [], catLoading: false });
      }
    } catch (error) {
      set({ catLoading: false });
      console.log(error);
    }
  },
});

export default ExpenseStore;
