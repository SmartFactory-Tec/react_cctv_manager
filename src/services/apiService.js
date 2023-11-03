import { backendHostUrl } from "./config";

const API_ENDPOINT = `${backendHostUrl}/api`;

/**
 * Fetch stream URLs from the backend server API endpoint.
 * @returns {Promise} A Promise that resolves to the retrieved data or logs any errors encountered during the fetch operation.
 */
export const getStreamURLs = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/cameras_overview/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Stream URLs Error:", error.message);
    throw error;
  }
};

/**
 * Handles API requests to the backend server.
 * @param {string} method - The HTTP method for the request (e.g., GET, POST, PUT, DELETE).
 * @param {string} endpoint - The API endpoint to be accessed.
 * @param {string} recordId - The ID of the record, if applicable.
 * @param {object} data - The data to be sent in the request, if applicable.
 * @returns {Promise} - A promise representing the completion of the request.
 */
const handleApiRequest = async (method, endpoint, recordId, data) => {
  const url = recordId ? `${endpoint}/${recordId}/` : `${endpoint}/`;

  try {
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const responseData = await response.json();
    return { ...responseData, status: response.status };
  } catch (error) {
    console.error(`${url} Request Error:`, error.message);
    throw error;
  }
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
  const endpoint = `${API_ENDPOINT}/cameras`;
  return handleApiRequest(method, endpoint, recordId, data);
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
  const endpoint = `${API_ENDPOINT}/people`;
  return handleApiRequest(method, endpoint, recordId, data);
};
