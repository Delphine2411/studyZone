const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  fichierUrl: { type: String }, // URL ou chemin du fichier
  matiere: { type: String },
  niveau: { type: String }, // collège, lycée, université...
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

documentSchema.index({ titre: 'text', matiere: 'text', niveau: 'text' });


module.exports = mongoose.model('Document', documentSchema);
