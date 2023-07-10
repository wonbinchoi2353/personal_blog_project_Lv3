const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.cookies;
    next();
  } catch (error) {}
};
