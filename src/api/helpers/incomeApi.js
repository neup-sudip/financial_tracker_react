import { ApiServices } from "../httpServices";

export const getIncomes = async () => {
  return await ApiServices.get(`/v1/income`);
};

export const getSingleIncome = async (incomeId) => {
  return await ApiServices.get(`/v1/income/${incomeId}`);
};

export const getIncomesByCategory = async (categoryId) => {
  return await ApiServices.get(`/v1/income/category/${categoryId}`);
};

export const getIncomePerMonthPerCat = async () => {
  return await ApiServices.get(`/v1/income/per-month`);
};

export const createIncome = async (income) => {
  const payload = {
    url: `/v1/income`,
    data: income,
  };
  return await ApiServices.post(payload);
};

export const updateIncome = async (income, incomeId) => {
  const payload = {
    url: `/v1/income/${incomeId}`,
    data: income,
  };
  return await ApiServices.put(payload);
};

export const deleteIncome = async (incomeId) => {
  return await ApiServices.delete(`/v1/income/${incomeId}`);
};
