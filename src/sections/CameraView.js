import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { parseCameraData } from "../utils/apiUtils";
import { websocketHostUrl } from "../services/config";

import CameraCanvas from "../components/camera/CameraCanvas.js";
import "./CameraView.css";
import { getStreamURLs } from "../services/apiService";

const CameraView = () => {
  const [cameraData, setCameraData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const canvasRefs = useRef([]);
  const socketsRef = useRef([]);

  useEffect(() => {
    // Update the loading state based on whether cameraData is empty or not
    setIsLoading(cameraData.length === 0);

    cameraData.forEach((camera, i) => {
      try {
        const { camera_id, frame } = camera;
        return parseCameraData(frame, canvasRefs.current[camera_id]);
      } catch (error) {
        console.error("Camera was not found.", error);
      }
    });
  }, [cameraData]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const streamUrlList = await getStreamURLs();

        const ids = streamUrlList.map((stream) => stream.camera_id);

        console.log(ids);

        ids.forEach((id) => {
          const socket = new WebSocket(`${websocketHostUrl}/ws/stream/${id}/`);

          socket.onmessage = (event) => {
            // Parse the JSON data
            const data = JSON.parse(event.data);

            setCameraData((prevData) => {
              const newData = [...prevData];
              newData[data.camera_id] = data;
              return newData;
            });
          };

          socketsRef.current.push(socket);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStreams();

    // Return the cleanup function to close all WebSocket connections
    return () => {
      // This throws a warning for some reason
      // eslint-disable-next-line
      socketsRef.current.forEach((socket) => socket.close());
    };
  }, []);

  return (
    <Row className="h-100 w-100">
      <Col xs={12} className="w-100">
        <h3>{/*Title*/}</h3>
      </Col>
      {/*
        Conditional rendering based on the isLoading state.
        If isLoading is true, display a loading spinner and a loading message.
        Otherwise, render nothing (null).
      */}
      {isLoading ? (
        <Col
          className="text-center spinner-column"
          style={{ color: "#19323c !important" }}
        >
          <Spinner />
          <p style={{ fontSize: "22px", fontWeight: "600" }} className="mt-2">
            Loading...
          </p>
        </Col>
      ) : null}

      {/*
        Map over the cameraData array to render each camera canvas.
        Set up the CameraCanvas component with a unique innerRef for each canvas.
      */}
      {cameraData.map((camera, i) => {
        return (
          <Col xs={6} key={i}>
            <CameraCanvas
              innerRef={(ref) => {
                canvasRefs.current[i] = ref;
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default CameraView;
