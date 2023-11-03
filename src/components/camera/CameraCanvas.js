import React from "react";
import { Card } from "react-bootstrap";
import "./CameraCanvas.css";

const CameraCanvas = ({ innerRef, cameraData, i }) => {
  const { camera_name, camera_id } = cameraData;

  return (
    <div>
      <Card
        className="camera-card mb-4"
        style={{ borderRadius: "12px !important" }}
      >
        <Card.Body>
          <Card.Title className="mb-3">
            <strong>{camera_id}</strong> - {camera_name}
          </Card.Title>
          <canvas key={i} ref={innerRef} width={720} height={480} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default CameraCanvas;
