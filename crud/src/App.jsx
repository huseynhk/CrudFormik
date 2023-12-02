import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/Router";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import AddUser from "./components/AddUser";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";
import UpdateUser from "./components/UpdateUser";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "./helper/momentData";

function App() {
  useEffect(() => {
    moment.locale("en");
    return () => {
      moment.locale();
    };
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTER.Home} exact element={<Home />} />
        <Route path={ROUTER.AddUser} element={<AddUser />} />
        <Route path={ROUTER.Detail + "/:userId"} element={<Detail />} />
        <Route path={ROUTER.UpdateUser + "/:userId"} element={<UpdateUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
