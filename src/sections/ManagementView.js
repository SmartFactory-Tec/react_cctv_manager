import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";

import { getStreamURLs } from "../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faTrash,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import { statusFormatter } from "./ManagementViewFormatters";

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

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const data = await getStreamURLs();
        console.log(data);
        setCameraData(data ? data : []);
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

  const columns = [
    {
      dataField: "camera_id",
      text: "ID",
      sort: true,
    },
    { dataField: "camera_name", text: "Name" },
    { dataField: "camera_location", text: "Location" },
    { dataField: "camera_url", text: "Stream URL" },
    { dataField: "camera_status", text: "Status", formatter: statusFormatter },
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
      <BootstrapTable
        headerClasses="custom-header"
        classes="custom-table"
        keyField="id"
        bordered={false}
        data={cameraData}
        columns={columns}
      />

      {/* ACTION MODALS */}
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
