const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  matiere: { type: String, required: true },
  niveau: { type: String, required: true },
  enseignant: { type: String, required: true },
  fichierUrl: { type: String, required: true }, // nom du fichier stocké
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
