const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // Récupère le token dans l'en-tête Authorization : "Bearer token"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Vérifie et décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupère les infos utilisateur (sans le mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // continue vers le contrôleur
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, aucun token fourni' });
  }
};

// Middleware pour vérifier si l'utilisateur est un enseignant
const isEnseignant = (req, res, next) => {
  if (req.user && req.user.role === 'enseignant') {
    next();
  } else {
    return res.status(403).json({ message: 'Accès réservé aux enseignants' });
  }
};

module.exports = { protect, isEnseignant };
