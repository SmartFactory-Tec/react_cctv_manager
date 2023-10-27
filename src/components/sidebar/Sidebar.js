import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCamera,
  faPersonWalking,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";

const DashboardSidebar = () => {
  return (
    <Sidebar className="h-100 w-100" backgroundColor="#2C3541">
      <Menu
        className="py-2"
        menuItemStyles={{
          button: {
            // The active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem component={<Link to="/cameras" />}>
          <FontAwesomeIcon icon={faCamera} className="me-2" /> Cameras
        </MenuItem>
        <MenuItem component={<Link to="/management" />}>
          <FontAwesomeIcon icon={faPersonWalking} className="me-2" /> Management
        </MenuItem>
        <MenuItem component={<Link to="/authentication" />}>
          <FontAwesomeIcon icon={faLock} className="me-2" /> Authentication
        </MenuItem>
        <MenuItem component={<Link to="/history" />}>
          <FontAwesomeIcon icon={faChartSimple} className="me-2" /> History
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default DashboardSidebar;
