import { ApiServices } from "../httpServices";

export const getInCategories = async () => {
  return await ApiServices.get(`/v1/category/income`);
};

export const getActiveInCategories = async () => {
  const { data, success, message } = await getInCategories();
  let categories = [];
  if (success) {
    categories = data?.filter((cat) => cat?.status);
  }
  return { success, data: categories, message };
};

export const getSingleInCategory = async (categoryId) => {
  return await ApiServices.get(`/v1/category/income/${categoryId}`);
};

export const createInCategory = async (category) => {
  const payload = {
    url: `/v1/category/income`,
    data: category,
  };
  return await ApiServices.post(payload);
};

export const updateInCategory = async (category, categoryId) => {
  const payload = {
    url: `/v1/category/income/${categoryId}`,
    data: category,
  };
  return await ApiServices.put(payload);
};

export const deleteInCategory = async (categoryId) => {
  return await ApiServices.delete(`/v1/category/income/${categoryId}`);
};
