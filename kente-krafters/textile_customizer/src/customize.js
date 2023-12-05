const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(cors());

const filePath = 'color_coordinates.txt';
const dataDictionary = {};
const newDataDictionary = {};

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // Split the file content into lines
  const lines = data.split('\n');

  // Process each line except the last one
  lines.slice(0, -1).forEach((line, index) => {
    // Split the line into two parts using a colon as the delimiter
    const parts = line.split(':');

    // Trim whitespaces from the left side (index 0)
    const leftSide = parts[0] ? parts[0].trim() : '';

    // Trim whitespaces from the right side (index 1) if it exists
    const rightSide = parts[1] ? parts[1].trim() : '';

    // Store data in the dictionary
    dataDictionary[leftSide] = rightSide;
  });

  // Log data types of keys and values
  for (const key in dataDictionary) {
    let rgbString = key.replace(/^\(|\)$/g, '');

    if (dataDictionary.hasOwnProperty(key)) {
      // Convert the value to a list using the provided logic
      const str = dataDictionary[key];
      const validJsonStr = str.replace(/\(/g, '[').replace(/\)/g, ']');
      const arr = JSON.parse(validJsonStr);
      newDataDictionary[rgbString] = arr;
    }
  }
  console.log(newDataDictionary);
});

// Endpoint to send processed data to the client
app.get('/getData', (req, res) => {
  // Send the processed data as JSON
  res.json(newDataDictionary);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
