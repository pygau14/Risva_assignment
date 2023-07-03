const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({storage : storage});


app.use(cors());
// Login endpoint
app.post('/login',upload.none(), (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  console.log(isAlphanumeric(username));

  // Check if the username and password meet the requirements
  if (!isAlphanumeric(username) || username.length < 6 || username.length > 12) {
    return res.status(200).json({ message: 'Username does not meet out Criteria' });
  }

  if (password.length < 6) {
    return res.status(200).json({ message: 'Your password is too short! Please enter more than 6 words to secure your account.' });
  }



  // Successful login
  res.status(200).json({ message: 'Login successful' });
});

// Utility function to check if a string is alphanumeric
function isAlphanumeric(str) {
  const hasAlphabets = /[a-zA-Z]/.test(str);
  const hasNumbers = /[0-9]/.test(str);
  return hasAlphabets && hasNumbers;
}

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
