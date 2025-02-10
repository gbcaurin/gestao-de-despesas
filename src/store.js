import { createStore } from "redux";

const initialState = {
  expenses: [],
  income: [],
  totalBalance: 0,
  budgetExceeded: false,
};

const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "ADD_INCOME":
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    case "UPDATE_BALANCE":
      return {
        ...state,
        totalBalance: action.payload,
      };
    case "SET_BUDGET_EXCEEDED":
      return {
        ...state,
        budgetExceeded: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(financeReducer);

export default store;
