import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../app/reducers/RoutingSlice";
import { Pages } from "../pages/PageEnums";
import DashboardIcon from "../images/icons/dashboard.svg";
import HistoryIcon from "../images/icons/history.svg";
import PeersIcon from "../images/icons/peers.svg";
import SettingsIcon from "../images/icons/settings.svg";
import "./NavBar.scss";

const NavBar = () => {
  const currentPage = useSelector(selectPage);
  const dispatch = useDispatch();

  // default static icons

  const handleClick = (props) => {
    // if (props !== currentPage) {
    dispatch(setPage(props));

    // }
  };

  const links = [
    {
      name: "dashboard",
      icon: DashboardIcon,
      enabled: true,
      page: Pages.Dashboard,
    },
    {
      name: "peers", // renamed for consistency in routing
      icon: PeersIcon,
      enabled: true,
      page: Pages.Peers,
    },
    {
      name: "history", // renamed for consistency in routing
      icon: HistoryIcon,
      enabled: true,
      page: Pages.History,
    },
    {
      name: "settings",
      icon: SettingsIcon,
      enabled: true,
      page: Pages.Settings,
    },
  ];

  return (
    <div className="navbar flex-r">
      {links.map((link) => {
        if (link.enabled) {
          return (
            <div
              className={`navbar-link ${currentPage === link.page ? "active" : "inactive"}`}
              key={link.name}
              id={link.name}
              onClick={() => handleClick(link.page)}
            >
              <img src={link.icon} alt="Link Icon" />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default NavBar;
