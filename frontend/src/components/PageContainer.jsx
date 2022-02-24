import React, { useEffect } from "react";
import { Pages } from "../pages/PageEnums";
import { selectPage, selectPrevPage, setPage } from "../app/reducers/RoutingSlice";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import Settings from "../pages/Settings";
import Peers from "../pages/Peers";
import NavBar from "./NavBar";
import "./PageContainer.scss";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

const PageContainer = () => {
  const currentPage = useSelector(selectPage);
  // const previousPage = useSelector(selectPrevPage); // Not sure if we'll need this, but it's here just in case

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Pages.Login:
        return <Login />;
      case Pages.Registration:
        return <Register />;
      case Pages.History:
        return (
          <>
            <History />
            <NavBar />
          </>
        );
      case Pages.Dashboard:
        return (
          <>
            <Dashboard />
            <NavBar />
          </>
        );
      case Pages.Peers:
        return (
          <>
            <Peers />
            <NavBar />
          </>
        );
      case Pages.Settings:
        return (
          <>
            <Settings />
            <NavBar />
          </>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="page-parent">
      <div className="page-container">{renderPage}</div>
    </div>
  );
};

export default PageContainer;
