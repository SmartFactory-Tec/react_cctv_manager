import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCamera,
  faPersonWalking,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import sf_logo from "../../assets/images/sf_logo.png";
import "./Sidebar.css";

const DashboardSidebar = () => {
  return (
    <Sidebar className="h-100 w-100" backgroundColor="#fff">
      <Menu
        className="py-4"
        menuItemStyles={{
          button: {
            // The active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              color: "white !important",
              backgroundColor: "#B72530 !important",
              boxSizing: "border-box",
            },
          },
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="w-100 mb-3"
        >
          <img
            src={sf_logo}
            className="ms-3 me-2 sidebar-brand"
            style={{ height: "50px" }}
            alt="sf_logo.png"
          />

          <div style={{ display: "inline-block" }}>
            <p
              className="mb-0 ps-0"
              style={{ fontWeight: 700, color: "#19323c", fontSize: "16px" }}
            >
              Smart
              <br />
              Factory
            </p>
          </div>
        </div>

        {/* <hr style={{ color: "#19323c" }} className="mx-0" /> */}

        <MenuItem component={<NavLink to="/cameras" />}>
          <FontAwesomeIcon icon={faCamera} className="me-3" />
          Cameras
        </MenuItem>
        <MenuItem component={<NavLink to="/management" />}>
          <FontAwesomeIcon icon={faPersonWalking} className="me-3" />
          Management
        </MenuItem>
        <MenuItem component={<NavLink to="/authentication" />}>
          <FontAwesomeIcon icon={faLock} className="me-3" />
          Authentication
        </MenuItem>
        <MenuItem component={<NavLink to="/history" />}>
          <FontAwesomeIcon icon={faChartSimple} className="me-3" />
          History
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default DashboardSidebar;
