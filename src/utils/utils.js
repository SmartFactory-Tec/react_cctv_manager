// Convert an array of objects to a CSV format
export const convertArrayOfObjectsToCSV = (array) => {
  let result = "";
  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result += keys.join(columnDelimiter) + lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

// Download a CSV file
export const downloadCSV = (array, filename) => {
  const csv = convertArrayOfObjectsToCSV(array);
  const exportedFilename = filename ? `${filename}.csv` : 'export.csv';

  const csvData = new TextEncoder('utf-8').encode('\uFEFF' + csv); // BOM character for UTF-8

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

// Generate a timestamp in the format "YYYYMMDD_HHMMSS"
export const generateTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();

  let month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};
