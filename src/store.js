import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expensesSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

export default store;
