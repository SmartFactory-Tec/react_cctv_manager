// Convert an array of objects to a CSV format
export const convertArrayOfObjectsToCSV = (array) => {
  let result = "";
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]); // Extract keys from the first object

  // Join the keys with column delimiter and add a line delimiter
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter; // Add column delimiter if not the first column

      result += item[key]; // Add the value of the current key
      ctr++;
    });
    result += lineDelimiter; // Add line delimiter after each object
  });

  return result; // Return the CSV string
};

// Download a CSV file
export const downloadCSV = (array, filename) => {
  const csv = convertArrayOfObjectsToCSV(array);
  const exportedFilename = filename + ".csv" || "export.csv";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Create a Blob with the CSV data
  if (navigator.msSaveBlob) {
    // For Internet Explorer
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    // For other browsers
    const link = document.createElement("a"); // Create a link element
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob); // Create a URL for the Blob
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilename); // Set the download attribute
      link.style.visibility = "hidden";
      document.body.appendChild(link); // Append the link to the document body
      link.click();
      document.body.removeChild(link); // Remove the link from the document body after download
    }
  }
};

// Generate a timestamp in the format "YYYYMMDD_HHMMSS"
export const generateTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = now.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};
