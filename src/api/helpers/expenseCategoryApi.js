import { ApiServices } from "../httpServices";

export const getExCategories = async () => {
  return await ApiServices.get(`/v1/category/expense`);
};

export const getActiveExCategories = async () => {
  const { data, success, message } = await getExCategories();
  let categories = [];
  if (success) {
    categories = data?.filter((cat) => cat?.status);
  }
  return { success, data: categories, message };
};

export const getSingleExCategory = async (categoryId) => {
  return await ApiServices.get(`/v1/category/expense/${categoryId}`);
};

export const createExCategory = async (category) => {
  const payload = {
    url: `/v1/category/expense`,
    data: category,
  };
  return await ApiServices.post(payload);
};

export const updateExCategory = async (category, categoryId) => {
  const payload = {
    url: `/v1/category/expense/${categoryId}`,
    data: category,
  };
  return await ApiServices.put(payload);
};

export const statusExCategory = async (categoryId, action) => {
  return await ApiServices.patch({
    url: `/v1/category/expense/${categoryId}`,
    data: action,
  });
};
