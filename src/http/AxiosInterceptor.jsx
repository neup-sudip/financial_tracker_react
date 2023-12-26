import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "./axios";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/sagas/actions";

const AxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRequest = () => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          dispatch(LOGOUT());
          navigate("/auth/login");
        }
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    handleRequest();
    //eslint-disable-next-line
  }, []);
  return <></>;
};

export default AxiosInterceptor;
