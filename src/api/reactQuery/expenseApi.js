import { ApiServices } from "../httpServices";

export const getExpenses = async () => {
  return await ApiServices.get(`/expense`);
};

export const getSingleExpense = async (expenseId) => {
  return await ApiServices.get(`/expense/${expenseId}`);
};

export const createExpense = async (expense) => {
  const payload = {
    url: `/expense`,
    data: expense,
  };
  return await ApiServices.post(payload);
};

export const updateExpense = async (expense, expenseId) => {
  const payload = {
    url: `/expense/${expenseId}`,
    data: expense,
  };
  return await ApiServices.put(payload);
};

export const deleteExpense = async (expenseId) => {
  return await ApiServices.delete(`/expense/${expenseId}`);
};
