import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "./axios";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/sagas/actions";
import Cookies from "js-cookie";

const AxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRequest = useCallback(() => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 403) {
          dispatch(LOGOUT());
          Cookies.remove("auth");
          navigate("/auth/login");
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch, navigate]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);
  return <></>;
};

export default AxiosInterceptor;
