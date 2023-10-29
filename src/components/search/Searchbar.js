import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

import "./Searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbar = () => {
  return (
    <div className="searchbar-bg p-2">
      <InputGroup>
        <Button
          variant="outline-secondary"
          className="rounded-button"
          id="button-addon2"
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Form.Control
          placeholder="Click to search or ask for something..."
          aria-label="Click to search or ask for something..."
          aria-describedby="basic-addon2"
          className="searchbar py-2"
        />
      </InputGroup>
    </div>
  );
};

export default Searchbar;
