const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { protect, isEnseignant } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Voir tous les documents (utilisateurs connectés)
router.get('/', protect, documentController.getAllDocuments);

// Ajouter un document (tous les utilisateurs connectés)
router.post('/', protect, upload.single('fichier'), documentController.createDocument);


// Modifier un document (enseignants uniquement)
router.put('/:id', protect, isEnseignant, documentController.updateDocument);

// Supprimer un document (enseignants uniquement)
router.delete('/:id', protect, isEnseignant, documentController.deleteDocument);

module.exports = router;
