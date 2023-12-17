import { ApiServices } from "../httpServices";

export const getCategories = async () => {
  return await ApiServices.get(`/v1/category/expense`);
};

export const getSingleCategory = async (categoryId) => {
  return await ApiServices.get(`/v1/category/expense/${categoryId}`);
};

export const createCategory = async (category) => {
  const payload = {
    url: `/v1/category/expense`,
    data: category,
  };
  return await ApiServices.post(payload);
};

export const updateCategory = async (category, categoryId) => {
  const payload = {
    url: `/v1/category/expense/${categoryId}`,
    data: category,
  };
  return await ApiServices.put(payload);
};

export const deleteCategory = async (categoryId) => {
  return await ApiServices.delete(`/v1/category/expense/${categoryId}`);
};
