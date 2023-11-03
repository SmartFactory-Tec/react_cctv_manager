import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/global.css";
import "./App.css";

import ManagementCameraEditView from "./sections/ManagementView/ManagementCameraEditView";
import ManagementPeopleEditView from "./sections/ManagementView/ManagementPeopleEditView";
import ManagementView from "./sections/ManagementView/ManagementView";
import DashboardSidebar from "./components/sidebar/Sidebar";
import Searchbar from "./components/search/Searchbar";
import CameraView from "./sections/CameraView";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Container fluid className="d-flex p-0 dashboard-container">
            <DashboardSidebar />

            <Row
              className="g-0 w-100 align-items-middle justify-content-center"
              style={{ position: "sticky", overflow: "auto" }}
            >
              <Col xs={12} className="d-flex flex-column p-4 align-items-start align-self-start">
                <Searchbar />

                <span className="mt-4" />

                <Routes>
                  <Route path="/cameras" element={<CameraView />} />
                  <Route exact path="/management" element={<ManagementView />} />
                  <Route exact path="/management/cameras/edit/:camera_id" element={<ManagementCameraEditView />} />
                  <Route exact path="/management/people/edit/:person_id" element={<ManagementPeopleEditView />} />
                </Routes>
              </Col>
            </Row>

            <ToastContainer
              position="bottom-right"
              autoClose={2500}
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
};

export default App;
