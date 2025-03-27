const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    // Ensure unique username or email to prevent duplicate accounts
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) return res.status(400).json({ msg: 'Username or Email already exists' });

    // Create a new user instance with the provided data
    user = new User({ name, email, username, password });

    // Hash the password to securely store it in the database
    const salt = await bcrypt.genSalt(10); // Generate a salt for added security
    user.password = await bcrypt.hash(password, salt); // Hash the password with the salt
    await user.save(); // Persist the user to the database

    // Respond with a success message to confirm registration
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    // Log the error for debugging purposes and return a generic server error
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists to validate login credentials
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Generate a JWT token to authenticate the user for future requests
    const payload = { user: { id: user.id } }; // Include user ID in the token payload
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use a secret key to sign the token
      { expiresIn: '1h' }, // Set an expiration time for the token
      (err, token) => {
        if (err) throw err; // Handle token generation errors
        res.json({ token, username: user.username, id: user.id }); // Respond with the generated token and username
      }
    );
  } catch (err) {
    // Log the error for debugging purposes and return a generic server error
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
