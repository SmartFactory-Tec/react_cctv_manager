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
        {/* Set up the Router for enabling routing in the app */}
        <Router>
          <Container fluid className="dashboard-container d-flex">
            <Row className="w-100 h-100">
              <Col xs={2} className="h-100 p-0">
                <DashboardSidebar />
              </Col>

              <Col xs={10} className="px-4 py-4">
                {/* Define the routes for the app using the Routes component */}
                {/* Add all paths here */}
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<h1>ooeoeoeoeoeoeoeoeoe</h1>}
                  />
                  <Route
                    exact
                    path="/management"
                    element={<h1>management ooeoeoeoeoeoeoeoeoe</h1>}
                  />
                  <Route path="/cameras" element={<CameraView />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </Router>
      </header>
    </div>
  );
}

export default App;
