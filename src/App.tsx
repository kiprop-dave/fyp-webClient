import Login from "./pages/login/Login";
import Readings from "./pages/readings/Readings";
import Auth from "./components/Auth";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="/readings" element={<Readings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
