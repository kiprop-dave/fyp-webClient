import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../context/authContext";

/*
 *This is the Auth component
 *It is used to protect the readings route
 *It will redirect the user to the login page if they are not authenticated
 *It will render the readings page if the user is authenticated
 */
function Auth() {
  const auth = useAuth();
  const { credentials } = auth;
  const location = useLocation();

  return (
    <>
      {credentials ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace={true} />
      )}
    </>
  );
}

export default Auth;
