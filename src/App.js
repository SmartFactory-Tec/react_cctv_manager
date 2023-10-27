import "./App.css";
import "./assets/styles/global.css";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import components for the app
import DashboardSidebar from "./components/sidebar/Sidebar";
import CameraView from "./sections/CameraView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <body>
          {/* Set up the Router for enabling routing in the app */}
          <Router>
            <Container fluid className="p-4 dashboard-container d-flex">
              <Row style={{ minHeight: "100% !important" }}>
                <Col xs={2} className="h-100">
                  <DashboardSidebar />
                </Col>

                {/* Define the routes for the app using the Routes component */}
                {/* Add all paths here */}
                <Routes>
                  <Route exact path="/" element={<CameraView />} />
                  <Route path="/cameras" element={<CameraView />} />
                </Routes>
              </Row>
            </Container>
          </Router>
        </body>
      </header>
    </div>
  );
}

export default App;
