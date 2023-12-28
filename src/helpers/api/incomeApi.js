import { ApiServices } from "../../http/httpServices";

export const getIncomes = async (page = 1) => {
  return await ApiServices.get(`/v1/income?page=${page}`);
};

export const downloadIncome = async () => {
  return await ApiServices.get("/v1/income/download");
};

export const getSingleIncome = async (incomeId) => {
  return await ApiServices.get(`/v1/income/${incomeId}`);
};

export const getIncomesByCategory = async (categoryId) => {
  return await ApiServices.get(`/v1/income/category/${categoryId}`);
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
