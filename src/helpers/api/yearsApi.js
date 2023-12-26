import { ApiServices } from "../../http/httpServices";

export const addYears = async (data, catId) => {
  const payload = {
    url: `/v1/expense-year/${catId}`,
    data,
  };
  return ApiServices.post(payload);
};

export const editYears = async (data, catId, yearId) => {
  const payload = {
    url: `/v1/expense-year/${catId}/${yearId}`,
    data,
  };
  return ApiServices.put(payload);
};
