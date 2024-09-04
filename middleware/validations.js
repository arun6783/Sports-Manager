const { body, query } = require('express-validator')

const validateClubData = [
  body('clubName').notEmpty().withMessage('Club name is required'),
  body('rules').notEmpty().withMessage('Club rules are required'),
  body('numCourts')
    .isInt({ min: 1 })
    .withMessage('Number of courts must be a positive integer'),
  body('players').isArray().withMessage('Players must be an array'),
]

const validateClubNameQuery = [
  query('clubName').notEmpty().withMessage('Club name is required'),
]

module.exports = {
  validateClubData,
  validateClubNameQuery,
}
