import React from "react";

import { faTableCellsLarge, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CameraSelectCard.css";

const CameraSelectCard = ({
  onClick,
  camera_name,
  camera_id,
  camera_location,
  camera_url,
  isMosaic,
}) => {
  if (isMosaic) {
    return (
      <div className="p-3 camera-select-card" onClick={onClick}>
        <FontAwesomeIcon icon={faTableCellsLarge} />
        <span className="ms-3">Mosaic</span>
      </div>
    );
  } else {
    return (
      <div className="p-3 camera-select-card" onClick={onClick}>
        <FontAwesomeIcon icon={faVideo} />
        <span className="ms-3">{camera_name}</span>
      </div>
    );
  }
};

export default CameraSelectCard;
