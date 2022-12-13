import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { Fragment } from "react";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import System from "./system/System";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-markdown-editor-lite/lib/index.css";

import { ToastContainer } from "react-toastify";

function App() {
  const roleId = useSelector((state) => state.user.userInfo.roleId);
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout ? DefaultLayout : Fragment;
          return (
            <Route
              path={route.path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {roleId === "R1" && <Route path="/system/*" element={<System />} />}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
