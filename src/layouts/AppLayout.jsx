import { Outlet } from "react-router-dom";
import ReactToast from "../common/toast/ReactToast";
import SideNavbar from "./SideNavbar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <ReactToast />
      <div className="d-flex">
        <div className="w-100" style={{ maxWidth: "250px", height: "100vh" }}>
          <SideNavbar />
        </div>
        <div className="w-100" style={{ height: "100vh" }}>
          <Navbar />
          <div className="px-3 mt-2 ">
            <div className="shadow rounded-1 bg-light-subtle">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
