import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

import { handleCameraApiRequest } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faTrash,
  faEdit,
  faEye,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";

import "./ManagementView.css";

const ManagementView = () => {
  const [cameraData, setCameraData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteCameraModalOpen = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCameraModalClose = () => {
    setShowDeleteModal(false);
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

  useEffect(() => {
    /**
     * Asynchronous function to fetch camera data from the server and update the camera data.
     */
    const fetchCameraData = async () => {
      try {
        // Retrieve camera data from the server.
        const { data } = await handleCameraApiRequest("GET");

        // Iterate through the data and update the camera status for each entry.
        const updatedData = data.map((camera) => ({
          ...camera,
          camera_status: getRandomStatus(),
        }));

        // Set the camera data state to the updated data, or an empty array if the data is unavailable.
        setCameraData(updatedData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCameraData();
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
        <Button
          className="icon-button text-secondary"
          onClick={() => {
            handleDeleteCameraModalOpen();
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </Button>

        {/* Button for editing camera details */}
        <Button
          className="icon-button text-secondary"
          onClick={() => {
            handleDeleteCameraModalOpen();
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>

        {/* Button for deleting a camera */}
        <Button
          className="icon-button text-danger"
          onClick={() => {
            handleDeleteCameraModalOpen();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
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

    // Switch statement to determine the appropriate styling and text based on the camera status
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
      {/* Row component for displaying the header */}
      <Row>
        <Col xs={6}>
          <h2 className="table-title pb-2">Cameras</h2>
        </Col>

        <Col xs={6} className="text-end">
          <h2 className="table-title pb-2">
            <Button>
              <FontAwesomeIcon icon={faAdd} className="me-2" />
              Add Camera
            </Button>
          </h2>
        </Col>
      </Row>
      {/* BootstrapTable component for displaying camera data */}
      <BootstrapTable
        headerClasses="custom-header"
        classes="custom-table"
        keyField="id"
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
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default ManagementView;
