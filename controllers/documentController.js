const Document = require('../models/documentModel');

exports.createDocument = async (req, res) => {
  try {
    const { matiere, niveau, enseignant } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier envoyé' });
    }

    const newDocument = new Document({
      matiere,
      niveau,
      enseignant,
      fichierUrl: req.file.filename,
    });

    await newDocument.save();

    res.status(201).json({ message: 'Document enregistré avec succès', data: newDocument });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getAllDocuments = async (req, res) => {
  const documents = await Document.find().sort({ createdAt: -1 });
  res.status(200).json(documents);
};



exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) return res.status(404).json({ message: 'Document introuvable' });
    res.json({ message: 'Document mis à jour', data: document });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document introuvable' });
    res.json({ message: 'Document supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

