import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import { handleCameraApiRequest } from "../../services/apiService";

import "./ManagementView.css";

const ManagementCameraEditView = () => {
  const { camera_id } = useParams();
  const navigate = useNavigate();

  const [cameraData, setCameraData] = useState({
    camera_url: "",
    camera_name: "",
    camera_id: "",
    camera_status: "",
    camera_location: "",
  });

  // Fetches camera data from the API upon component mounting
  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const { data, status } = await handleCameraApiRequest("GET", camera_id);
        console.info("Camera data fetch successful. Status:", status);
        setCameraData(data);
      } catch (error) {
        console.error("Error fetching camera data: ", error);
      }
    };

    fetchCameraData();
  }, [camera_id]);

  // Update form data based on user input
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setCameraData({ ...cameraData, [id]: value });
  };

  // Update the camera information via API call when the form is submitted
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        camera_url: cameraData.camera_url,
        camera_location: cameraData.camera_location,
        camera_name: cameraData.camera_name,
      };

      const request = await handleCameraApiRequest(
        "PUT",
        cameraData.camera_id,
        requestData
      );

      // Check for a successful response and redirect the user
      if (request.status === 200) {
        toast.success("Camera data updated successfully!");
        navigate("/management");
      } else {
        throw new Error(
          "Failed to update camera data. Status code: " + request.status
        );
      }
    } catch (error) {
      console.error("An error occurred while updating camera data: ", error);
      toast.error("Failed to update camera data. Please try again.");
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        submitForm(e);
      }}
    >
      <Row>
        <Col xs={12}>
          <h2 className="section-title">Edit Camera</h2>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="camera_id">
            <Form.Label>
              Camera ID <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              required
              readOnly
              type="text"
              value={cameraData.camera_id}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="camera_name">
            <Form.Label>
              Camera Name <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={cameraData.camera_name}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="camera_location">
            <Form.Label>
              Camera Location <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={cameraData.camera_location}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="camera_status">
            <Form.Label>Camera Status</Form.Label>
            <Form.Select
              value={cameraData.camera_status}
              onChange={handleFormChange}
            >
              <option value="cameraData.online">Online</option>
              <option value="cameraData.offline">Offline</option>
              <option value="cameraData.inactive">Inactive</option>
              <option value="cameraData.unknown">Unknown</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="camera_url">
            <Form.Label>Camera URL</Form.Label>
            <Form.Control
              type="text"
              value={cameraData.camera_url}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={12} className="text-end">
          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManagementCameraEditView;
