import { Suspense, lazy } from "react";
import Auth from "./components/Auth";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";

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
