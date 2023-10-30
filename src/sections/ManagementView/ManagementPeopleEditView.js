import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { handlePersonApiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./ManagementView.css";

const ManagementPeopleEditView = () => {
  const { person_id } = useParams();
  const navigate = useNavigate();

  const [personData, setPersonData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    tec_id: "",
    major: "",
    created_at: "",
  });

  // Fetch person data from the API on component mount
  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const { data, status } = await handlePersonApiRequest(
          "GET",
          person_id,
          null
        );
        console.info("Promise completed | Status:", status);
        setPersonData(data);
      } catch (error) {
        console.error("Error fetching person data: ", error);
      }
    };

    fetchPersonData();
  }, [person_id]);

  // Update form data based on user input
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setPersonData({ ...personData, [id]: value });
  };

  // Update the person information via API call when Form is submitted
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const request = await handlePersonApiRequest("PUT", personData.id, {
        first_name: personData.first_name,
        last_name: personData.last_name,
        email: personData.email,
        tec_id: personData.tec_id,
        major: personData.major,
        phone_number: personData.phone_number,
      });

      // Check for a successful response and redirect the user
      if (request.status === 200) {
        toast.success("Person data updated correctly!");
        navigate("/management");
      }
    } catch (error) {
      console.error(error);
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
          <h2 className="section-title">Edit Person</h2>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>
              Person ID <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              required
              readOnly
              type="text"
              value={personData.id}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="first_name">
            <Form.Label>
              First Name <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={personData.first_name}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="last_name">
            <Form.Label>
              Last Name <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={personData.last_name}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="text"
              value={personData.email}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="tec_id">
            <Form.Label>
              Tec ID <span className="section-label-required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={personData.tec_id}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="major">
            <Form.Label>Major</Form.Label>
            <Form.Control
              type="text"
              value={personData.major}
              onChange={handleFormChange}
            />
          </Form.Group>
        </Col>

        <Col xs={6}>
          <Form.Group className="mb-3" controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={personData.phone_number}
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

export default ManagementPeopleEditView;
