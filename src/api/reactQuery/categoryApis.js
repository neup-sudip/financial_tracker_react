import { ApiServices } from "../httpServices";

export const getCategories = async () => {
  return await ApiServices.get(`/category`);
};

export const getSingleCategory = async (categoryId) => {
  return await ApiServices.get(`/category/${categoryId}`);
};

export const createCategory = async (category) => {
  const payload = {
    url: `/category`,
    data: category,
  };
  return await ApiServices.post(payload);
};

export const updateCategory = async (category, categoryId) => {
  const payload = {
    url: `/category/${categoryId}`,
    data: category,
  };
  return await ApiServices.put(payload);
};

export const deleteCategory = async (categoryId) => {
  return await ApiServices.delete(`/category/${categoryId}`);
};
