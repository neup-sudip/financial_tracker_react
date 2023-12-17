import { Outlet } from "react-router-dom";
import ReactToast from "../common/toast/ReactToast";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <ReactToast />
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
