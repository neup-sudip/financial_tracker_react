/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
const Protected = ({ profile }) => {
  if (!profile) {
    return <Navigate to="/welcome" replace />;
  }
  return <Outlet />;
};
export default Protected;
