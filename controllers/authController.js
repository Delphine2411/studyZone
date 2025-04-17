const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création de l'utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Création d'un token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Inscription réussie',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//Connection
exports.login = async (req, res) => {
  const { identifiant, password } = req.body;

  try {
    // Recherche par email ou nom
    const user = await User.findOne({
      $or: [{ email: identifiant }, { name: identifiant }]
    });

    if (!user) {
      return res.status(400).json({ message: "Identifiant ou mot de passe invalide." });
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiant ou mot de passe invalide." });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

