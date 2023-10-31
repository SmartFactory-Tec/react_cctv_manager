import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

import "./Searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faGear } from "@fortawesome/free-solid-svg-icons";
const UserProfilePicture = () => {
  const first_name = "José";
  const last_name = "González";

  const getRandomColor = () => {
    const colors = ["#f94144", "#f8961e", "#90be6d", "#43aa8b", "#577590"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const circleStyle = {
    backgroundColor: getRandomColor(),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="profile-picture ms-3 d-flex align-items-center">
        <div className="profile-circle me-2" style={circleStyle}>
          <span className="initials">
            {first_name[0]}
            {last_name[0]}
          </span>
        </div>
      </div>{" "}
      {/*
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>{first_name}</div>
        <div className="ms-1">{last_name}</div>
      </div>
      */}
    </div>
  );
};

const Searchbar = () => {
  return (
    <div className="searchbar-bg d-flex justify-content-end align-items-center w-100">
      <InputGroup>
        <Button
          variant="outline-secondary"
          className="rounded-button"
          id="button-addon2"
        >
          <FontAwesomeIcon icon={faSearch} className="text-secondary" />
        </Button>
        <Form.Control
          placeholder="Click to search or ask for something..."
          aria-label="Click to search or ask for something..."
          aria-describedby="basic-addon2"
          className="searchbar py-2"
        />
      </InputGroup>
      <div className="notification-icon ms-4">
        <FontAwesomeIcon icon={faGear} size="xl" className="text-secondary" />
      </div>
      <div className="notification-icon ms-4">
        <FontAwesomeIcon icon={faBell} size="xl" className="text-secondary" />
      </div>
      <UserProfilePicture />
    </div>
  );
};

export default Searchbar;
