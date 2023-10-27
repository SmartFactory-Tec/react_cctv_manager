/**
 * Parse and render camera frame data onto the canvas.
 * @param {string} frame - The camera frame data in base64 format.
 * @param {Object} canvasRef - Reference to the canvas element.
 */
export const parseCameraData = (frame, canvasRef) => {
  try {
    // Retrieve the canvas element from the provided reference
    const canvas = canvasRef;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Create a new image object and load the base64-encoded frame data
    const img = new Image();

    // Once the image is loaded, draw it onto the canvas
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Set the image source to the base64-encoded frame data
    img.src = `data:image/jpeg;base64,${frame}`;
  } catch (error) {
    console.error(error);
  }
};
