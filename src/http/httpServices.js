import { getApi, putApi, postApi, deleteApi, patchApi } from "./axios.js";

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
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      });
    return resObj;
  },

  get: async (payload) => {
    await getApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      });
    return resObj;
  },

  put: async (payload) => {
    await putApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      });
    return resObj;
  },

  patch: async (payload) => {
    await patchApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      });
    return resObj;
  },

  delete: async (payload) => {
    await deleteApi(payload)
      .then((res) => {
        setResponse(res);
      })
      .catch((error) => {
        setError(error);
      });
    return resObj;
  },
};

const setResponse = (res) => {
  resObj.data = res?.data?.data;
  resObj.message = res?.data?.message;
  resObj.status = res?.status;
  if (res?.data?.result) {
    resObj.success = true;
  } else {
    resObj.success = false;
  }
};

const setError = (error) => {
  resObj.success = false;
  resObj.data = error?.response?.data?.data;
  resObj.message = error?.response?.data?.message;
  resObj.status = error?.response?.status;
};
