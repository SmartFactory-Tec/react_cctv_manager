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
    <Sidebar className="h-100 w-100" backgroundColor="#19323C">
      <Menu
        className="py-4"
        menuItemStyles={{
          button: {
            // The active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              color: "#fff !important",
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
              style={{ fontWeight: 600, color: "white", fontSize: "20px" }}
            >
              Smart
              <br />
              Factory
            </p>
          </Col>
        </Row>

        <hr style={{ color: "#F6F0ED" }} className="mx-3" />

        <MenuItem component={<NavLink to="/cameras" />}>
          <Row>
            <Col xs={1}>
              <FontAwesomeIcon icon={faCamera} />
            </Col>
            <Col xs={11} className="ps-4">
              Cameras
            </Col>
          </Row>
        </MenuItem>
        <MenuItem component={<NavLink to="/management" />}>
          <Row>
            <Col xs={1}>
              <FontAwesomeIcon icon={faPersonWalking} />
            </Col>
            <Col xs={11} className="ps-4">
              Management
            </Col>
          </Row>
        </MenuItem>
        <MenuItem component={<NavLink to="/authentication" />}>
          <Row>
            <Col xs={1}>
              <FontAwesomeIcon icon={faLock} />
            </Col>
            <Col xs={11} className="ps-4">
              Authentication
            </Col>
          </Row>
        </MenuItem>
        <MenuItem component={<NavLink to="/history" />}>
          <Row>
            <Col xs={1}>
              <FontAwesomeIcon icon={faChartSimple} />
            </Col>
            <Col xs={11} className="ps-4">
              History
            </Col>
          </Row>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default DashboardSidebar;
