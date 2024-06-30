const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies

app.use(express.json());

// Middleware to serve static files

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to retrieve all text files in a folder

app.get('/get/:folderName', (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(__dirname, folderName);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).send('Folder not found');
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to read folder contents');
    }

    const textFiles = files.filter(file => file.endsWith('.txt'));

    if (textFiles.length === 0) {
      return res.send('No text files found in the folder');
    }

    res.json({ textFiles });
  });
});

// POST request to create a folder

app.post('/folder', (req, res) => {
  const { folderName } = req.body;

  if (!folderName) {
    return res.status(400).send('Folder name is required');
  }

  const folderPath = path.join(__dirname, folderName);

  if (fs.existsSync(folderPath)) {
    return res.status(400).send('Folder already exists');
  }

  fs.mkdir(folderPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to create folder');
    }

    res.status(201).send(`Folder '${folderName}' created successfully`);
  });
});

// POST request to create a file inside an existing folder

app.post('/file', (req, res) => {
  const { folderName } = req.body;

  if (!folderName) {
    return res.status(400).send('Folder name is required');
  }

  const folderPath = path.join(__dirname, folderName);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).send('Folder does not exist');
  }

  const currentDate = new Date();
  const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, `Created at: ${currentDate.toLocaleString()}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to create file');
    }
    
    res.status(201).send(`File '${fileName}' created successfully in folder '${folderName}'`);
  });
});

// To start the server

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
