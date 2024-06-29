const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies

app.use(express.json());

// Middleware to serve static files

app.use(express.static(path.join(__dirname, 'public')));


// API endpoint to retrieve all text files in a folder

app.get('/folder/:folderName', (req, res) => {
  const folderName = req.params.folderName;

  // Construct the path to the folder

  const folderPath = path.join(__dirname, folderName);

  // Check if the folder exists

  if (!fs.existsSync(folderPath)) {
    return res.status(404).send('Folder not found');
  }

  // To read the contents of the folder

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to read folder contents');
    }

    // Filter out only text files

    const textFiles = files.filter(file => file.endsWith('.txt'));

    // If no text files found

    if (textFiles.length === 0) {
      return res.send('No text files found in the folder');
    }

    res.json({ textFiles });
  });
});

// POST request to create a folder and file together

app.post('/create_folder_file', (req, res) => {
  const { folderName } = req.body;

  
  if (!folderName) {
    return res.status(400).send('Folder name is required');
  }

  // path where the folder will be created

  const folderPath = path.join(__dirname, folderName);

  // Checking if the folder already exists

  if (fs.existsSync(folderPath)) {
    return res.status(400).send('Folder already exists');
  }

  // Creating the folder

  fs.mkdir(folderPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to create folder');
    }

    // Generating file name based on current date and time

    const currentDate = new Date();
    const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, fileName);

    // Creating a file with current date-time inside the newly created folder

    fs.writeFile(filePath, `Created at: ${currentDate.toLocaleString()}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to create file');
      }
      res.status(201).send(`Folder '${folderName}' and file '${fileName}' created successfully`);
    });
  });
});

// To start the server

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
