import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import {
  fetchExpenses,
  createExpense,
  deleteExpense,
} from "../services/database";
import { getDates } from "../services/helper";

const initialState = {
  expList: null,
  monthlyTotal: null,
  loading: false,
  addLoading: false,
  error: null,
};

export const fetchExpAsync = createAsyncThunk(
  "fetchExpenseThunk",
  async (data, { rejectWithValue }) => {
    try {
      console.log("fetching dates", data);
      const rsp = await fetchExpenses(data);
      console.log("Rsp -->");
      console.log(rsp);
      return rsp;
    } catch (error) {
      console.log("catch errro >", error);
      return rejectWithValue({ error: "Error! Cannot fetch Expenses" });
    }
  }
);
export const addExpAsync = createAsyncThunk(
  "addExpenseThunk",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await createExpense(data);
      dispatch(fetchExpAsync(getDates()));
      return;
    } catch (error) {
      console.log("Create Expense Error -->", error);
      return rejectWithValue({ error: "Error! Cannot create Expense" });
    }
  }
);
export const delExpAsync = createAsyncThunk(
  "delExpenseThunk",
  async (id, { dispatch }) => {
    try {
      await deleteExpense(id);
      dispatch(fetchExpAsync(getDates()));
      return;
    } catch (error) {
      console.log("DELETE ERROR -->", error);
      return rejectWithValue({ error: "Error! Cannot delete Expense" });
    }
  }
);

// Redux Toolkit slice
export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpAsync.fulfilled, (state, action) => {
        let groupDate;
        let calMonthly;
        if (action.payload && action.payload.length) {
          calMonthly = action.payload.reduce((total, cur) => {
            return (total += cur.amount);
          }, 0);
          groupDate = action.payload.reduce(function (val, obj) {
            let comp = moment(obj["date"]).format("DD MMM");
            (val[comp] = val[comp] || []).push(obj);
            return val;
          }, {});
        } else {
          groupDate = null;
          calMonthly = 0;
        }
        state.loading = false;
        state.expList = groupDate;
        state.monthlyTotal = calMonthly;
        state.error = null;
      })
      .addCase(fetchExpAsync.rejected, (state, action) => {
        console.log("Rejected ->", action.payload);
        state.loading = false;
        state.error = "Error! Cannot fetch expenses";
      })
      .addCase(addExpAsync.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addExpAsync.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addExpAsync.rejected, (state) => {
        state.addLoading = false;
      });
  },
});
export default expenseSlice.reducer;
