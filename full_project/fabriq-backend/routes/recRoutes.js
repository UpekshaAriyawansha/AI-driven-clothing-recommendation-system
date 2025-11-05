const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { addUserPreferences, getUserById, getAllUserPreferences } = require('../controller/recCtr');

const validateUserPreferences = [
  check('skinColor').notEmpty().withMessage('Skin color is required'),
  check('gender').notEmpty().withMessage('Gender is required'),
  check('ageCategory').notEmpty().withMessage('Age category is required'),
  check('heightCategory').notEmpty().withMessage('Height category is required'),
  check('weightCategory').notEmpty().withMessage('Weight category is required'),
  check('occasionType').notEmpty().withMessage('Occasion type is required')
];

router.post('/add', validateUserPreferences, addUserPreferences);
router.get('/:id', getUserById);

module.exports = router;

