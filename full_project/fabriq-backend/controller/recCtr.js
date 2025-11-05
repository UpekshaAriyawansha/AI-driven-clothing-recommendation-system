const { validationResult } = require('express-validator');
const User = require('../models/recData');  

//add one
exports.addUserPreferences = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { bodyShape, skinColor, gender, ageCategory, heightCategory, weightCategory, occasionType } = req.body;

    const newUser = new User({ bodyShape, skinColor, gender, ageCategory, heightCategory, weightCategory, occasionType });
    await newUser.save();

    res.status(201).json({ message: 'User preferences saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};


// get one 
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;  

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

