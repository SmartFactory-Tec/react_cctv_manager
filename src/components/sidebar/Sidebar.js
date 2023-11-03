import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCamera,
  faPersonWalking,
  faChartSimple,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import sf_logo from "../../assets/images/sf_logo.png";
import "./Sidebar.css";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Sidebar
        className="h-100 w-100"
        backgroundColor="#fff"
        collapsed={collapsed}
        collapsedWidth="5em !important"
      >
        <Menu
          className="py-4"
          menuItemStyles={{
            button: {
              [`&.active`]: {
                color: "white !important",
                backgroundColor: "transparent !important",
                borderLeft: "4px solid #ffffff",
                borderRadius: "0px !important",
              },
            },
          }}
        >
          {" "}
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="w-100 mb-3"
          >
            <img
              src={sf_logo}
              className="ms-3 me-3 sidebar-brand"
              style={{ height: "50px" }}
              alt="sf_logo.png"
            />

            <div style={{ display: "inline-block" }}>
              <p
                className="mb-0 ps-0"
                style={{ fontWeight: 700, color: "white", fontSize: "16px" }}
              >
                Smart
                <br />
                Factory
              </p>
            </div>
          </div>
          <MenuItem
            component={<NavLink to="/cameras" />}
            icon={<FontAwesomeIcon icon={faCamera} />}
          >
            Cameras
          </MenuItem>
          <MenuItem
            component={<NavLink to="/management" />}
            icon={<FontAwesomeIcon icon={faPersonWalking} />}
          >
            Management
          </MenuItem>
          <MenuItem
            component={<NavLink to="/authentication" />}
            icon={<FontAwesomeIcon icon={faLock} />}
          >
            Security
          </MenuItem>
          <MenuItem
            component={<NavLink to="/history" />}
            icon={<FontAwesomeIcon icon={faChartSimple} />}
          >
            Activity Log
          </MenuItem>
        </Menu>

        <Button
          className="d-flex py-2 sidebar-drawer-icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <FontAwesomeIcon icon={faAnglesRight} size="1x" />
          ) : (
            <FontAwesomeIcon icon={faAnglesLeft} size="1x" />
          )}
        </Button>
      </Sidebar>
    </div>
  );
};

export default DashboardSidebar;
