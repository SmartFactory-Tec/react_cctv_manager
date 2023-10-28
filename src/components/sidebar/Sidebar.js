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
            },
          },
        }}
      >
        <Row className="d-flex align-items-center justify-content-center mb-4">
          <Col xs={3} className="align-items-center justify-content-center">
            <img
              src={sf_logo}
              className="px-3  sidebar-brand"
              style={{ maxHeight: "70px" }}
              alt="sf_logo.png"
            />
          </Col>
          <Col className="align-items-center justify-content-center">
            <p
              className="mb-0 ps-3"
              style={{ fontWeight: 700, color: "#19323c", fontSize: "20px" }}
            >
              Smart
              <br />
              Factory
            </p>
          </Col>
        </Row>

        <hr style={{ color: "#19323c" }} className="mx-3" />

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
