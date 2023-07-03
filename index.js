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

// Sample data for fruits
const fruits = [
  { id: 1, name: 'Apple', color: 'Red' },
  { id: 2, name: 'Banana', color: 'Yellow' },
  { id: 3, name: 'Orange', color: 'Orange' },
  { id: 4, name: 'Grapes', color: 'Green' },
  { id: 5, name: 'Strawberry', color: 'Red' },
  { id: 6, name: 'Blueberry', color: 'Blue' },
  { id: 7, name: 'Pineapple', color: 'Yellow' },
  { id: 8, name: 'Watermelon', color: 'Green' },
  { id: 9, name: 'Mango', color: 'Yellow' },
  { id: 10, name: 'Kiwi', color: 'Brown' },
];

// API endpoint to get sorted fruits by color
app.get('/fruits', (req, res) => {
  const sortedFruits = fruits.sort((a, b) => a.color.localeCompare(b.color));

  res.json(sortedFruits);
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
