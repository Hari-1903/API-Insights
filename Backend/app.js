const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

const getHighestLowercase = (arr) => {
  const lowercase = arr.filter((char) => char >= 'a' && char <= 'z');
  return lowercase.sort().pop();
};

// POST method endpoint
app.post('/data', upload.single('file'), (req, res) => {
  const { userId, collegeEmailId, collegeRollNumber, numberArray, alphabetArray } = req.body;
  const file = req.file;

  // Handle file validation
  let isValidFile = false;
  let mimeType = null;
  let fileSizeKB = null;

  if (file) {
    mimeType = file.mimetype;
    fileSizeKB = file.size / 1024; 
    isValidFile = true;
  }

  // Response payload
  const response = {
    status: 'success',
    userId: userId,
    collegeEmailId: collegeEmailId,
    collegeRollNumber: collegeRollNumber,
    numberArray: numberArray,
    alphabetArray: alphabetArray,
    highestLowercaseAlphabet: getHighestLowercase(alphabetArray),
    file: {
      isValid: isValidFile,
      mimeType: mimeType,
      sizeKB: fileSizeKB
    }
  };

  res.json(response);
});

app.get('/operation_code', (req, res) => {
  res.json({ operation_code: 12345 }); // Example operation code
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
