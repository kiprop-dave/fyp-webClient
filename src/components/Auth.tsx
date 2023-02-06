import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/authContext";

function Auth() {
  const auth = useAuth();
  if (!auth) return null;
  const { token } = auth;
  const location = useLocation();

  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace={true} />
      )}
    </>
  );
}

export default Auth;
