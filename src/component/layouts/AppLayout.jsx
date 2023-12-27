import { Outlet } from "react-router-dom";
import ReactToast from "../../common/toast/ReactToast";
import SideNavbar from "./SideNavbar";
import Navbar from "./Navbar";
import { useState } from "react";

const AppLayout = ({ profile }) => {
  const [showSideNav, setShowSideNav] = useState(true);

  return (
    <>
      <ReactToast />
      <div className="d-flex">
        {profile && showSideNav && (
          <div className="w-100" style={{ maxWidth: "250px", height: "100vh" }}>
            <SideNavbar />
          </div>
        )}
        <div className="w-100" style={{ height: "90vh" }}>
          <Navbar showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
          <div className="px-3 mt-2 h-100">
            <div className="shadow rounded-1 bg-light-subtle h-100">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
