import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

import { handleCameraApiRequest } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faTrash,
  faEdit,
  // faEye,
  faCircle,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./ManagementView.css";

const ManagementCameraComponent = () => {
  const navigate = useNavigate();

  const [cameraData, setCameraData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [cameraToDelete, setCameraToDelete] = useState({});
  const [cameraToCreate, setCameraToCreate] = useState({
    camera_url: "",
    camera_name: "",
    camera_id: "",
    camera_status: "",
    camera_location: "",
  });

  const handleDeleteCameraModalOpen = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCameraModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleCreateCameraModalClose = () => {
    setShowCreateModal(false);
  };

  const handleCreateCameraModalOpen = () => {
    setShowCreateModal(true);
  };

  /**
   * Retrieves a random camera status from a predefined list of statuses.
   * @returns {string} - A random camera status.
   */
  const getRandomStatus = () => {
    const statuses = ["online", "offline", "inactive", "unknown"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

  /**
   * Asynchronous function to fetch camera data from the server and update the camera data.
   */
  const fetchCameraData = async () => {
    try {
      const { data } = await handleCameraApiRequest("GET");

      // Iterate through the data and update the camera status for each entry.
      const updatedData = data.map((camera) => ({
        ...camera,
        camera_status: getRandomStatus(),
      }));

      setCameraData(updatedData || []);
    } catch (error) {
      console.error(error);
    }
  };

  /** Handles the deletion of a camera
   * @param {string} id: The ID of the camera to be deleted
   * @param {string} name: The name of the camera to be deleted
   */
  const handleCameraDeletion = async (id, name) => {
    try {
      const request = await handleCameraApiRequest("DELETE", id, null);

      if (request.status === 200) {
        toast.success("Camera deleted successfully.");
        fetchCameraData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update form data based on user input
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setCameraToCreate({ ...cameraToCreate, [id]: value });
  };

  const submitCameraCreateForm = async (e) => {
    e.preventDefault();

    try {
      const request = await handleCameraApiRequest("POST", null, {
        camera_id: cameraToCreate.camera_id,
        camera_url: cameraToCreate.camera_url,
        camera_location: cameraToCreate.camera_location,
        camera_name: cameraToCreate.camera_name,
      });

      if (request.status === 201) {
        toast.success("Camera created successfully!");
        setShowCreateModal(false);
        fetchCameraData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCameraData();
    // eslint-disable-next-line
  }, []);

  /**
   * Formats actions for a cell in a table, rendering a set of buttons for various operations.
   * @param {any} cell - The cell value.
   * @param {object} row - The row data object.
   * @returns {JSX.Element} JSX elements representing action buttons for the cell.
   */
  const actionsFormatter = (cell, row) => {
    return (
      <>
        {/* Button for viewing camera details */}
        {/*
        <Button
          className="icon-button text-secondary"
          onClick={() => {
            handleDeleteCameraModalOpen();
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>
        */}

        {/* Button for editing camera details */}
        <Button
          className="icon-button text-secondary"
          onClick={() => {
            navigate(`/management/cameras/edit/${row.camera_id}`);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>

        <Button
          className="icon-button text-danger"
          onClick={() => {
            setCameraToDelete(row);
            handleDeleteCameraModalOpen();
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="trash-icon" />
        </Button>
      </>
    );
  };

  /**
   * Formats the status for each camera in the table.
   * Renders a status icon along with the corresponding status text.
   * @param {any} cell - The cell value.
   * @param {object} row - The row data object.
   * @returns {JSX.Element} - JSX elements representing the camera status with an icon.
   */
  const statusFormatter = (cell, row) => {
    const { camera_status } = row;

    switch (camera_status) {
      case "online":
        return (
          <p className="mb-0 pb-0">
            <FontAwesomeIcon
              icon={faCircle}
              size="2xs"
              className="me-2 text-success"
            />
            Online
          </p>
        );
      case "offline":
        return (
          <p className="mb-0 pb-0">
            <FontAwesomeIcon
              icon={faCircle}
              size="2xs"
              className="me-2 text-danger"
            />
            Offline
          </p>
        );
      case "inactive":
        return (
          <p className="mb-0 pb-0">
            <FontAwesomeIcon
              icon={faCircle}
              size="2xs"
              className="me-2 text-secondary"
            />
            Inactive
          </p>
        );
      default:
        // Default case when the camera status is not recognized
        return (
          <p className="mb-0 pb-0">
            <FontAwesomeIcon
              icon={faCircle}
              size="2xs"
              className="me-2 text-secondary"
            />
            Unkown
          </p>
        );
    }
  };

  const columns = [
    {
      dataField: "camera_id",
      text: "ID",
      align: "center",
      headerAlign: "center",
      style: { fontWeight: "bold" },
      headerStyle: { width: "4em", textAlign: "center" },
    },
    { dataField: "camera_name", text: "Name" },
    { dataField: "camera_location", text: "Location" },
    { dataField: "camera_url", text: "Stream URL" },
    {
      dataField: "camera_status",
      text: "Status",
      formatter: statusFormatter,
    },
    {
      dataField: "actions",
      text: "",
      isDummyField: true,
      headerAlign: "end",
      align: "end",
      csvExport: false,
      formatter: actionsFormatter,
    },
  ];

  return (
    <div>
      <div>
        <Row>
          <Col xs={6}>
            <h2 className="table-title pb-2">Cameras</h2>
          </Col>

          <Col xs={6} className="text-end">
            <Button
              variant="primary-outline" className="me-2"
              onClick={() => toast.info("Not available yet!")}
            >
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Download CSV
            </Button>
            <Button
              variant="primary"
              onClick={() => handleCreateCameraModalOpen()}
            >
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add Camera
            </Button>
          </Col>
        </Row>

        {/* BootstrapTable component for displaying camera data */}
        <BootstrapTable
          headerClasses="custom-header"
          classes="custom-table"
          keyField="camera_id"
          bordered={false}
          data={cameraData}
          columns={columns}
        />

        {/* Modal component for handling camera deletion */}
        <>
          <Modal
            show={showDeleteModal}
            onHide={() => {
              handleDeleteCameraModalClose();
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Camera</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              <strong>{cameraToDelete.camera_name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleDeleteCameraModalClose();
                }}
              >
                Close
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteCameraModalClose();
                  handleCameraDeletion(
                    cameraToDelete.camera_id,
                    cameraToDelete.camera_name
                  );
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        {/* Modal component for creating a camera */}
        <>
          <Modal
            show={showCreateModal}
            onHide={() => {
              handleCreateCameraModalClose();
            }}
            centered
          >
            <Form
              onSubmit={(e) => {
                submitCameraCreateForm(e);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Camera</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="camera_id">
                  <Form.Label>
                    Camera ID <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={cameraToCreate.camera_id}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="camera_name">
                  <Form.Label>
                    Camera Name{" "}
                    <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={cameraToCreate.camera_name}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="camera_location">
                  <Form.Label>
                    Camera Location{" "}
                    <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={cameraToCreate.camera_location}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="camera_status">
                  <Form.Label>Camera Status</Form.Label>
                  <Form.Select
                    value={cameraToCreate.camera_status}
                    onChange={handleFormChange}
                  >
                    <option value="cameraToCreate.online">Online</option>
                    <option value="cameraToCreate.offline">Offline</option>
                    <option value="cameraToCreate.inactive">Inactive</option>
                    <option value="cameraToCreate.unknown">Unknown</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="camera_url">
                  <Form.Label>Camera URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={cameraToCreate.camera_url}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCreateCameraModalClose();
                  }}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Confirm
                </Button>
              </Modal.Footer>{" "}
            </Form>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default ManagementCameraComponent;
