import { backendHostUrl } from "./config";

/**
 * Fetch stream URLs from the backend server API endpoint.
 * @returns {Promise} A Promise that resolves to the retrieved data or logs any errors encountered during the fetch operation.
 */
export const getStreamURLs = () => {
  return fetch(`${backendHostUrl}/api/cameras_overview/`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Stream URLs:", err.message);
    });
};
