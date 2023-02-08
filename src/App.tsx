import { Suspense, lazy } from "react";
import Auth from "./components/Auth";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./pages/login/Login"));
const Readings = lazy(() => import("./pages/readings/Readings"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
