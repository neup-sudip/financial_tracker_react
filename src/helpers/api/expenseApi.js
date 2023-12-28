import { ApiServices } from "../../http/httpServices";

export const getExpenses = async (page = 1) => {
  return await ApiServices.get(`/v1/expense?page=${page}`);
};

export const downloadExpense = async () => {
  return await ApiServices.get("/v1/expense/download");
};

export const getSingleExpense = async (expenseId) => {
  return await ApiServices.get(`/v1/expense/${expenseId}`);
};

export const getExpensesByCategory = async (categoryId) => {
  return await ApiServices.get(`/v1/expense/category/${categoryId}`);
};

export const createExpense = async (expense) => {
  const payload = {
    url: "/v1/expense",
    data: expense,
  };
  return await ApiServices.post(payload);
};

export const updateExpense = async (expense, expenseId) => {
  const payload = {
    url: `/v1/expense/${expenseId}`,
    data: expense,
  };
  return await ApiServices.put(payload);
};

export const deleteExpense = async (expenseId) => {
  return await ApiServices.delete(`/v1/expense/${expenseId}`);
};
