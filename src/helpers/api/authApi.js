import { ApiServices } from "../../http/httpServices";

export const login = async (auth) => {
  const payload = {
    url: "/auth/login",
    data: auth,
  };
  return await ApiServices.post(payload);
};

export const register = async (auth) => {
  const payload = {
    url: "/auth/register",
    data: auth,
  };
  return await ApiServices.post(payload);
};

export const getProfile = async () => {
  return await ApiServices.get("/v1/profile");
};
