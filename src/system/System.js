import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import SystemLayout from "../layouts/SystemLayout";
import { privateRoutes } from "../routes";

function System() {
  return (
    <Routes>
      {privateRoutes.map((route, index) => {
        const Page = route.component;
        const Layout = route.layout ? SystemLayout : Fragment;
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
    </Routes>
  );
}

export default System;
