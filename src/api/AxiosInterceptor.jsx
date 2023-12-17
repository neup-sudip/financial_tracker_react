import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "./axios";

const AxiosInterceptor = () => {
  const navigate = useNavigate();

  const handleRequest = () => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
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
