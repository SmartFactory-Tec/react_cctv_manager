import "./App.css";
import "./assets/styles/global.css";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components for the app
import DashboardSidebar from "./components/sidebar/Sidebar";
import CameraView from "./sections/CameraView";
import ManagementView from "./sections/ManagementView/ManagementView";
import Searchbar from "./components/search/Searchbar";
import ManagementCameraEditView from "./sections/ManagementView/ManagementCameraEditView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Set up the Router for enabling routing in the app */}
        <Router>
          <Container fluid className="dashboard-container d-flex pe-0">
            <Row className="w-100 h-100">
              <Col xs={2} className="h-100 p-0">
                <DashboardSidebar />
              </Col>

              <Col xs={10} className="p-0">
                <Row className="g-0">
                  <Col xs={12}>
                    <Searchbar />
                  </Col>
                  <Col xs={12} className="py-3 px-4">
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
                        element={<ManagementView />}
                      />
                      <Route
                        exact
                        path="/management/cameras/edit/:camera_id"
                        element={<ManagementCameraEditView />}
                      />
                      <Route
                        exact
                        path="/management/persons/edit/:person_id"
                        element={<ManagementView />}
                      />
                      <Route path="/cameras" element={<CameraView />} />
                    </Routes>
                  </Col>
                </Row>
              </Col>
            </Row>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Container>
        </Router>
      </header>
    </div>
  );
}

export default App;
