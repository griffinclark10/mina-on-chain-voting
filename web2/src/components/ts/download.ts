export default function downloadFile(data: string, format: string) {
  let fileContent;
  let mimeType;
  let fileExtension;

  const dataArray = JSON.parse(data) as Array<{ [key: string]: any }>;

  if (format === 'csv') {
    fileContent = convertToCSV(dataArray);
    mimeType = 'text/csv';
    fileExtension = 'csv';
  } else if (format === 'xslx') {
    mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    fileExtension = 'xslx';
  } else {
    console.error('Unsupported format');
    return;
  }

  // Create a Blob from the data
  const blob = new Blob([fileContent], { type: mimeType });

  // Create a link and trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `data.${fileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function convertToCSV(data: any[]) {
  try {
    if (!Array.isArray(data)) {
      throw new Error('Parsed JSON is not an array.');
    }
    const rows = data.map((item) => Object.values(item).join(','));
    return rows.join('\n');
  } catch (error) {
    console.error('Error parsing JSON string:', error);
    return '';
  }
}
