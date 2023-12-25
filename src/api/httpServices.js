import { getApi, putApi, postApi, deleteApi } from "./axios.js";

let resObj = {
  data: "",
  success: false,
  message: "",
  status: "",
};

export const ApiServices = {
  post: async (payload) => {
    await postApi(payload)
      .then((res) => {
        if (res?.data?.result) {
          resObj.data = res.data?.data;
          resObj.success = true;
          resObj.message = res.data?.message;
          resObj.status = res?.status;
        } else {
          resObj.message = res.data?.message;
          resObj.success = false;
          resObj.data = res?.data?.data;
          resObj.status = res?.status;
        }
      })
      .catch((error) => {
        resObj.success = false;
        resObj.data = error?.response?.data?.data;
        resObj.message = error?.response?.data?.message;
        resObj.status = error?.response?.status;
      });
    return resObj;
  },

  get: async (payload) => {
    await getApi(payload)
      .then((res) => {
        if (res?.data?.result) {
          resObj.data = res.data?.data;
          resObj.success = true;
          resObj.message = res.data?.message;
          resObj.status = res?.status;
        } else {
          resObj.message = res.data?.message;
          resObj.data = res?.data?.data;
          resObj.success = false;
          resObj.status = res?.status;
        }
      })
      .catch((error) => {
        resObj.success = false;
        resObj.data = error?.response?.data?.data;
        resObj.message = error.response?.data?.message;
        resObj.status = error?.response?.status;
      });
    return resObj;
  },

  put: async (payload) => {
    await putApi(payload)
      .then((res) => {
        if (res?.data?.result) {
          resObj.data = res.data?.data;
          resObj.success = true;
          resObj.message = res.data?.message;
          resObj.status = res?.status;
        } else {
          resObj.message = res.data?.message;
          resObj.data = res?.data?.data;
          resObj.success = false;
          resObj.status = res?.status;
        }
      })
      .catch((error) => {
        resObj.success = false;
        resObj.data = error?.response?.data?.data;
        resObj.message = error.response?.data?.message;
        resObj.status = error?.response?.status;
      });
    return resObj;
  },

  delete: async (payload) => {
    await deleteApi(payload)
      .then((res) => {
        if (res?.data?.result) {
          resObj.data = res.data?.data;
          resObj.success = true;
          resObj.message = res.data?.message;
          resObj.status = res?.status;
        } else {
          resObj.message = res.data?.message;
          resObj.data = res?.data?.data;
          resObj.success = false;
          resObj.status = res?.status;
        }
      })
      .catch((error) => {
        resObj.success = false;
        resObj.data = error?.response?.data?.data;
        resObj.message = error.response?.data?.message;
        resObj.status = error?.response?.status;
      });
    return resObj;
  },
};
