/* eslint-disable react/prop-types */

import { Navigate, Outlet } from "react-router-dom";
const Public = ({ profile }) => {
  if (!profile) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
};
export default Public;
