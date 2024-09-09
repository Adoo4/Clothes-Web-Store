let jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

let userMid = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  let token = authHeader.slice(7); // Extract token

  try {
    let decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded; // Attach user info to the request

    // Optional: Fetch user from the database to verify role
    let userAuth = await User.findById(decoded.id);
    if (!userAuth) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Check for admin role (or any other role check)
    if (userAuth.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Unauthorized. Invalid token.' });
  }
};

module.exports = userMid;
