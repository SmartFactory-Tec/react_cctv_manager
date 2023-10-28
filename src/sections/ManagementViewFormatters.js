import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export const statusFormatter = (cell, row) => {
  switch (cell) {
    case "online":
      return (
        <p className="mb-0 pb-0">
          <FontAwesomeIcon
            icon={faCircle}
            size="2xs"
            className="me-2 text-success"
          />{" "}
          Online
        </p>
      );
    case "offline":
      return (
        <p className="mb-0 pb-0">
          <FontAwesomeIcon
            icon={faCircle}
            size="2xs"
            className="me-2 text-danger"
          />{" "}
          Offline
        </p>
      );
    case "inactive":
      return (
        <p className="mb-0 pb-0">
          <FontAwesomeIcon
            icon={faCircle}
            size="2xs"
            className="me-2 text-warning"
          />
          Inactive
        </p>
      );
    default:
      return (
        <p className="mb-0 pb-0">
          <FontAwesomeIcon
            icon={faCircle}
            size="2xs"
            className="me-2 text-danger"
          />
          Offline
        </p>
      );
  }
};
