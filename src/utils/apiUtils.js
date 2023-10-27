export const parseCameraData = (frame, canvasRef) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = `data:image/jpeg;base64,${frame}`;
    } catch (error) {
      console.error(error);
    }
};
