import React from "react";
import ManagementCameraComponent from "./ManagementCameraComponent";
import ManagementPeopleComponent from "./ManagementPeopleComponent";

const ManagementView = () => {
  return (
    <div>
      <ManagementPeopleComponent />
      <ManagementCameraComponent />
    </div>
  );
};

export default ManagementView;
