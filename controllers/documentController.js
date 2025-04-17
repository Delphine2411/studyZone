const Document = require('../models/documentModel');

// Voir tous les documents
exports.getAllDocuments = async (req, res) => {
    try {
      const { matiere, niveau, titre } = req.query;
  
      // Construire dynamiquement le filtre
      const filtre = {};
  
      if (matiere) {
        filtre.matiere = { $regex: matiere, $options: 'i' }; // insensible à la casse
      }
  
      if (niveau) {
        filtre.niveau = { $regex: niveau, $options: 'i' };
      }
  
      if (titre) {
        filtre.titre = { $regex: titre, $options: 'i' };
      }
  
      const documents = await Document.find(filtre).populate('enseignant', 'name email');
  
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  };
  

// Ajouter un document
exports.createDocument = async (req, res) => {
    try {
      const { titre, description, matiere, niveau } = req.body;
  
      const nouveauDoc = new Document({
        titre,
        description,
        fichierUrl: req.file ? req.file.path : null,
        matiere,
        niveau,
        enseignant: req.user._id,
      });
  
      const saved = await nouveauDoc.save();
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  };
  

// Modifier un document
exports.updateDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });

    // Mise à jour (optionnel : vérifier que l'enseignant est bien le créateur)
    Object.assign(doc, req.body);
    const updated = await doc.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Supprimer un document
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) return res.status(404).json({ message: 'Document non trouvé' });

    await doc.remove();
    res.json({ message: 'Document supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
