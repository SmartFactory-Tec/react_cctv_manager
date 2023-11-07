import React, { useEffect, useRef, useState } from "react";
import { getStreamURLs } from "../services/apiService";
import { websocketHostUrl } from "../services/config";
import { Row, Col, Spinner } from "react-bootstrap";
import { renderCameraFrame } from "../utils/apiUtils";

import CameraSelectCard from "../components/camera/CameraSelectCard.js";
import CameraCanvas from "../components/camera/CameraCanvas.js";

import "./CameraView.css";

const CameraView = () => {
  const [cameraData, setCameraData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const canvasRefs = useRef([]);
  const socketsRef = useRef([]);

  useEffect(() => {
    // Update the loading state based on whether cameraData is empty or not
    if (isLoading === true) {
      setIsLoading(cameraData.length === 0);
    }

    let dataToUse = [];

    if (selectedCamera !== undefined && selectedCamera !== null) {
      dataToUse = cameraData.filter(
        (camera) => camera?.camera_id === selectedCamera
      );
    } else {
      dataToUse = cameraData;
    }

    dataToUse.forEach((camera, i) => {
      try {
        const { camera_id, frame } = camera;
        renderCameraFrame(frame, canvasRefs.current[camera_id]);
      } catch (error) {
        console.error("Camera was not found.", error);
      }
    });
  }, [cameraData, selectedCamera, isLoading]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const streamUrlList = await getStreamURLs();

        const ids = streamUrlList.map((stream) => stream.camera_id);

        ids.forEach((id) => {
          const socket = new WebSocket(`${websocketHostUrl}/ws/stream/${id}/`);

          socket.onmessage = (event) => {
            // Parse the JSON data
            let data = JSON.parse(event.data);

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
    <Row className="w-100">
      <Col xs={2}>
        <div
          style={{
            borderRadius: "12px",
            backgroundColor: "white !important",
          }}
          className="border border-secondary camera-select-card-container"
        >
          <CameraSelectCard
            isMosaic={true}
            onClick={() => {
              setSelectedCamera(null);
            }}
          />
          <div style={{ borderBottom: "1px solid #ddd" }} />
          {cameraData.map((camera, i) => (
            <React.Fragment key={i}>
              <CameraSelectCard
                {...camera}
                onClick={() => {
                  setSelectedCamera(camera?.camera_id);
                }}
              />
              {i !== cameraData.length - 1 && (
                <div style={{ borderBottom: "1px solid #ddd" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </Col>

      <Col xs={10} className="sticky-column">
        <Row>
          {/*
            Map over the cameraData array to render each camera canvas.
            Set up the CameraCanvas component with a unique innerRef for each canvas.
          */}
          {cameraData.map((camera, i) => {
            if (selectedCamera === null) {
              return (
                <Col xs={6} key={i}>
                  <CameraCanvas
                    {...camera}
                    innerRef={(ref) => {
                      canvasRefs.current[i] = ref;
                    }}
                  />
                </Col>
              );
            } else if (selectedCamera === camera?.camera_id) {
              return (
                <Col xs={12} key={i}>
                  <CameraCanvas
                    {...camera}
                    innerRef={(ref) => {
                      canvasRefs.current[i] = ref;
                    }}
                  />
                </Col>
              );
            } else {
              return <></>;
            }
          })}
        </Row>
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
    </Row>
  );
};

export default CameraView;
