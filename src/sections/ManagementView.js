import React, { useState, useEffect } from "react";

import { getStreamURLs } from "../services/apiService";

const ManagementView = () => {
  const [cameraData, setCameraData] = useState([]);

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const data = await getStreamURLs();
        setCameraData(data ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCameraData();
  }, []);

  return (
    <div>
      {cameraData.map((camera, i) => {
        return (
          <h3 key={i}>
            {camera.camera_id} - {camera.camera_name}
          </h3>
        );
      })}
    </div>
  );
};

export default ManagementView;
