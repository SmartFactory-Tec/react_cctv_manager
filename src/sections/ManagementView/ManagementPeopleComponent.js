import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

import { handlePersonApiRequest } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./ManagementView.css";

const ManagementPeopleComponent = () => {
  const navigate = useNavigate();

  const [peopleData, setPeopleData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [personToDelete, setPersonToDelete] = useState({});
  const [personToCreate, setPersonToCreate] = useState({
    id: "",
  });

  const handleDeletePersonModalOpen = () => {
    setShowDeleteModal(true);
  };

  const handleDeletePersonModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleCreatePersonModalClose = () => {
    setShowCreateModal(false);
  };

  const handleCreatePersonModalOpen = () => {
    setShowCreateModal(true);
  };

  const fetchPeopleData = async () => {
    try {
      const { data } = await handlePersonApiRequest("GET");

      console.log(data);

      // Iterate through the data and update the person status for each entry.
      const updatedData = data.map((person) => ({
        ...person,
      }));

      setPeopleData(updatedData || []);
    } catch (error) {
      console.error(error);
    }
  };

  /** Handles the deletion of a person
   * @param {string} id: The ID of the person to be deleted
   * @param {string} name: The name of the person to be deleted
   */
  const handlePersonDeletion = async (id, name) => {
    try {
      const request = await handlePersonApiRequest("DELETE", id, null);

      if (request.status === 200) {
        toast.success("Person deleted successfully.");
        fetchPeopleData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update form data based on user input
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setPersonToCreate({ ...personToCreate, [id]: value });
  };

  const submitPersonCreateForm = async (e) => {
    e.preventDefault();

    try {
      const request = await handlePersonApiRequest("POST", null, {
        first_name: personToCreate.first_name,
        last_name: personToCreate.last_name,
        email: personToCreate.email,
        tec_id: personToCreate.tec_id,
        major: personToCreate.major,
        phone_number: personToCreate.phone_number,
      });

      if (request.status === 201) {
        toast.success("Person created successfully!");
        setShowCreateModal(false)
        fetchPeopleData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchPeopleData();
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
        {/* Button for editing person details */}
        <Button
          className="icon-button text-secondary"
          onClick={() => {
            navigate(`/management/people/edit/${row.id}`);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>

        <Button
          className="icon-button text-danger"
          onClick={() => {
            setPersonToDelete(row);
            handleDeletePersonModalOpen();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      align: "center",
      headerAlign: "center",
      style: { fontWeight: "bold" },
      headerStyle: { width: "4em", textAlign: "center" },
    },
    { dataField: "first_name", text: "First Name" },
    { dataField: "last_name", text: "Last Name" },

    { dataField: "tec_id", text: "Tec ID" },
    { dataField: "major", text: "Major" },
    { dataField: "email", text: "E-mail" },
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
      <div className="mb-3">
        <Row>
          <Col xs={6}>
            <h2 className="table-title pb-2">People</h2>
          </Col>

          <Col xs={6} className="text-end">
            <h2 className="table-title pb-2">
              <Button onClick={() => handleCreatePersonModalOpen()}>
                <FontAwesomeIcon icon={faAdd} className="me-2" />
                Add Person
              </Button>
            </h2>
          </Col>
        </Row>

        {/* BootstrapTable component for displaying people data */}
        <BootstrapTable
          headerClasses="custom-header"
          classes="custom-table"
          keyField="id"
          bordered={false}
          data={peopleData}
          columns={columns}
        />

        {/* Modal component for handling person deletion */}
        <>
          <Modal
            show={showDeleteModal}
            onHide={() => {
              handleDeletePersonModalClose();
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              <strong>
                {personToDelete.first_name} {personToDelete.last_name}
              </strong>
              ?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleDeletePersonModalClose();
                }}
              >
                Close
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeletePersonModalClose();
                  handlePersonDeletion(
                    personToDelete.id,
                    personToDelete.first_name
                  );
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        {/* Modal component for creating a person */}
        <>
          <Modal
            show={showCreateModal}
            onHide={() => {
              handleCreatePersonModalClose();
            }}
            centered
          >
            <Form
              onSubmit={(e) => {
                submitPersonCreateForm(e);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Person</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>
                    Person ID <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    readOnly
                    type="text"
                    value={personToCreate.id}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="first_name">
                  <Form.Label>
                    First Name <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={personToCreate.first_name}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="last_name">
                  <Form.Label>
                    Last Name <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={personToCreate.last_name}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    value={personToCreate.email}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tec_id">
                  <Form.Label>
                    Tec ID <span className="section-label-required">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={personToCreate.tec_id}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="major">
                  <Form.Label>Major</Form.Label>
                  <Form.Control
                    type="text"
                    value={personToCreate.major}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={personToCreate.phone_number}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCreatePersonModalClose();
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

export default ManagementPeopleComponent;
