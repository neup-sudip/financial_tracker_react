import { ApiServices } from "../../http/httpServices";

export const getTransactions = async (page = 1, query = "") => {
  return await ApiServices.get(`/v1/transaction?page=${page}&query=${query}`);
};

export const getAllTransactions = async () => {
  return await ApiServices.get("/v1/transaction/download");
};
