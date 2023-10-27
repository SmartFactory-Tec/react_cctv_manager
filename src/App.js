import "./App.css";
import "./assets/styles/global.css";
import React, { useEffect, useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "./components/sidebar/Sidebar.js";
import { parseCameraData } from "./utils/apiUtils";

function App() {
  // const [cameraData, setCameraData] = useState([]);

  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const canvasRef4 = useRef(null);

  // useEffect(() => {
  //   canvasRefs.current = cameraData.map(() => React.createRef());
  // }, [cameraData]);

  const updateCanvas = (data) => {
    const cameraId = data.camera_id;
    const frame = data.frame;

    switch (cameraId) {
      case 0:
        return parseCameraData(frame, canvasRef1);
      case 1:
        return parseCameraData(frame, canvasRef2);
      case 2:
        return parseCameraData(frame, canvasRef3);
      case 3:
        return parseCameraData(frame, canvasRef4);

      default:
        return null;
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/router/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse the JSON data
      console.log(data);
      updateCanvas(data);
    };

    return () => {
      socket.close();
    };
  }, []);

  //useEffect(() => {
  //  cameraData.forEach((camera, index) => {
  //    try {
  //      const canvas = canvasRefs.current[index]?.current;
  //      if (!canvas) return;
  //      const ctx = canvas.getContext("2d");
  //      const img = new Image();
  //
  //      img.onload = () => {
  //        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //      };
  //      img.src = `data:image/jpeg;base64,${camera.frame}`;
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  });
  //}, [cameraData]);

  return (
    <div className="App">
      <header className="App-header">
        <body>
          <Container fluid className="p-4 dashboard-container d-flex">
            <Row style={{ minHeight: "100% !important" }}>
              <Col xs={2} className="h-100">
                <Sidebar />
              </Col>

              <Col xs={10} className="px-4">
                <Row>
                  <Col xs={6}>
                    <canvas
                      key={"camera1"}
                      ref={canvasRef1}
                      width={720}
                      height={480}
                    />
                  </Col>
                  <Col xs={6}>
                    <canvas
                      key={"camera2"}
                      ref={canvasRef2}
                      width={720}
                      height={480}
                    />
                  </Col>
                  <Col xs={6}>
                    <canvas
                      key={"camera3"}
                      ref={canvasRef3}
                      width={720}
                      height={480}
                    />
                  </Col>
                  <Col xs={6}>
                    <canvas
                      key={"camera4"}
                      ref={canvasRef4}
                      width={720}
                      height={480}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </body>
      </header>
    </div>
  );
}

export default App;
