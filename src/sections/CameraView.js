import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { parseCameraData } from "../utils/apiUtils";

const CameraView = () => {
  const [cameraData, setCameraData] = useState([]);
  const canvasRefs = useRef([]);

  useEffect(() => {
    // Iterate through the cameraData array and render each camera frame onto the corresponding canvas
    cameraData.forEach((camera, i) => {
      const { camera_id, frame } = camera;

      // Call the function to parse and render the camera frame data onto the respective canvas
      return parseCameraData(frame, canvasRefs.current[camera_id]);
    });
  }, [cameraData]);

  useEffect(() => {
    // Establish a WebSocket connection with the provided URL
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/router/");

    // Handle incoming messages from the WebSocket server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse the JSON data
      setCameraData((prevData) => {
        // Create a new array based on the previous data and add the new data
        const newData = [...prevData];
        newData[data.camera_id] = data;
        return newData;
      });
    };

    // Close the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  return (
    <Col xs={10} className="px-4">
      <Row>
        {cameraData.map((camera, i) => {
          console.log(canvasRefs.current[i]);

          return (
            <Col xs={6}>
              <canvas
                key={"camera_" + i}
                ref={(ref) => {
                  canvasRefs.current[i] = ref;
                }}
                width={720}
                height={480}
              />
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default CameraView;
