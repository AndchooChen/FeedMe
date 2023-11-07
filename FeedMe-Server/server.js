const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Users = require('./model/Users.js');
const UserLogin = require('./model/UserLogin.js');
const DailyIntake = require('./model/DailyIntake.js');

app.use(bodyParser.json());
app.use(express.json());

const uri = "mongodb+srv://andchoo:achen122901@feedme.dsn2col.mongodb.net/FeedMe?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => console.log(err));

  const secretKey = uuidv4(); // Use a secure secret key instead of uuidv4()

  // Generate JWT token for the given user
  function generateToken(user) {
    const payload = { id: user._id };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
  }
  
  // Verify JWT token and extract user information
  function verifyToken(token) {
    return jwt.verify(token, secretKey);
  }

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("trying to create user");

    // Check if the email or username already exists in the database
    const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    // Create a new user document
    const newUser = new Users({ username, email, password });
    await newUser.save();
    console.log('User saved');

    const token = generateToken(newUser); // Generate JWT token

    // Handle the successful signup and send a response to the client
    res.json({ message: 'Signup successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});

// POST /login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await UserLogin.findOne({ email });
    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the password stored in the database
    if (password === user.password) {
      const token = generateToken(user); // Generate JWT token

      // Password is valid, authentication successful
      return res.status(200).json({ message: 'Login successful', token: token });
    } else {
      // Password is invalid
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Define your API route for the food search
app.post('/food-search', async (req, res) => {
  try {
    const { foodItem } = req.body;
  
    const API_URL = 'https://api.edamam.com/api/food-database/v2/parser';
    const APP_ID = 'c9196c3f';
    const APP_KEY = '7e2e152ea91b71e53664c9ada367c0c0';
    const nutritionType = 'cooking';

    const requestURL = `${API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${foodItem}&nutrition-type=${nutritionType}`;

    const response = await require('isomorphic-fetch')(requestURL);
    const data = await response.json();

    // Return the API response data
    res.json(data);
  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/nutrition', async (req, res) => {
    const { foodItem, weightType, quantity } = req.body;
  
    const requestData = {
      ingredients: [
        {
          quantity: parseFloat(quantity),
          measureURI: weightType,
          foodId: foodItem.food.foodId,
        },
      ],
    };
  
    const url = 'https://api.edamam.com/api/food-database/v2/nutrients';
    const appId = 'c9196c3f';
    const appKey = '7e2e152ea91b71e53664c9ada367c0c0';
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };
  
    try {
      const response = await fetch(`${url}?app_id=${appId}&app_key=${appKey}`, options);
      const data = await response.json();
      res.json(data);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching nutrition data.' });
    }
  });

app.post('/dailyIntake', async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from request headers
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const tokenWithoutBearer = token.slice(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(tokenWithoutBearer); // Verify the token and extract user information
    const userId = decoded.id; // Extract the user ID from the token
    const calories = req.body.calories;
    const foodName = req.body.foodName;

    const existingIntake = await DailyIntake.findOne({ userId });

    if (existingIntake) {
      const updatedCalories = existingIntake.calories + calories;
      existingIntake.calories = updatedCalories;
      existingIntake.foodName.push(foodName); // Add the foodName to the foodName array
      await existingIntake.save();
    } else {
      const newIntake = new DailyIntake({ userId, calories, foodName });
      await newIntake.save();
    }

    res.status(200).json({ message: 'Daily intake saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/dailyIntake', async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from request headers
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const tokenWithoutBearer = token.slice(7); // Remove 'Bearer ' prefix
    const decoded = verifyToken(tokenWithoutBearer); // Verify the token and extract user information
    const userId = decoded.id; // Extract the user ID from the token

    const existingIntake = await DailyIntake.findOne({ userId });

    if (existingIntake) {
      res.status(200).json({ calories: existingIntake.calories, foodNames: existingIntake.foodName });
    } else {
      res.status(404).json({ error: 'Daily intake not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});