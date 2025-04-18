const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // Vérifi si le token est en authorisation
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information to the request object (without password)
      req.user = await User.findById(decoded.id).select('-password');
      
      next();  // Continue to the controller
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, aucun token fourni' });
  }
};

// Middleware to check if the user is an 'enseignant'
const isEnseignant = (req, res, next) => {
  if (req.user && req.user.role === 'enseignant') {
    next(); // Allow access to the next middleware/controller
  } else {
    return res.status(403).json({ message: 'Accès réservé aux enseignants' });
  }
};

module.exports = { protect, isEnseignant };
