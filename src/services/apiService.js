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

/**
 * Handles camera requests to the backend server.
 * @param {string} method - The HTTP method for the request (e.g., GET, POST, PUT, DELETE).
 * @param {string} recordId - The ID of the camera record, if applicable.
 * @param {object} data - The data to be sent in the request, if applicable.
 * @returns {Promise} - A promise representing the completion of the request.
 */
export const handleCameraApiRequest = (
  method,
  recordId = undefined,
  data = undefined
) => {
  let url = `${backendHostUrl}/api/cameras/`;

  // Append the record ID to the URL if it exists
  // 0 is taken as null or undefined for some reason
  if (recordId !== undefined && recordId !== null) {
    url += `${recordId}/`;
  }

  // Construct the request options with the appropriate headers and body
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      return res.json().then((data) => ({ ...data, status: res.status }));
    })
    .catch((err) => {
      console.error("Camera Request Error:", err.message);
      throw err;
    });
};

/**
 * Handles person requests to the backend server.
 * @param {string} method - The HTTP method for the request (e.g., GET, POST, PUT, DELETE).
 * @param {string} recordId - The ID of the person record, if applicable.
 * @param {object} data - The data to be sent in the request, if applicable.
 * @returns {Promise} - A promise representing the completion of the request.
 */
export const handlePersonApiRequest = (
  method,
  recordId = undefined,
  data = undefined
) => {
  let url = `${backendHostUrl}/api/people/`;

  // Append the record ID to the URL if it exists
  if (recordId !== undefined && recordId !== null) {
    url += `${recordId}/`;
  }

  // Construct the request options with the appropriate headers and body
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      return res.json().then((data) => ({ ...data, status: res.status }));
    })
    .catch((err) => {
      console.error("Person Request Error:", err.message);
      throw err;
    });
};
