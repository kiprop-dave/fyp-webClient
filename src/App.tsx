import { Suspense, lazy } from "react";
import Auth from "./components/Auth";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";

/*
 * Lazy loading of components helps to reduce the initial bundle size and improve the performance
 * Suspense is used to show a fallback component while the component is being loaded
 * Auth is a wrapper component that checks if the user is logged in or not
 * If the user is not logged in, the user is redirected to the login page
 * If the user is logged in, the user is redirected to the readings page
 */
const Login = lazy(() => import("./routes/login/Login"));
const Readings = lazy(() => import("./routes/readings/Readings"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Auth />}>
            <Route path="/readings" element={<Readings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
