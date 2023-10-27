import React from "react";
import "./CameraCanvas.css";

const CameraCanvas = ({ innerRef, i }) => {
  return <canvas key={i} ref={innerRef} width={1080} height={720} />;
};

export default CameraCanvas;
