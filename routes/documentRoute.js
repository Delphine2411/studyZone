const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const documentController = require('../controllers/documentController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Tous les utilisateurs authentifiés peuvent ajouter
router.post('/', protect, upload.single('fichierUrl'), documentController.createDocument);

// Tout le monde peut lire
router.get('/', documentController.getAllDocuments);

// Seuls les enseignants peuvent modifier ou supprimer
router.put('/:id', protect, (req, res, next) => {
  if (req.user.role !== 'enseignant') {
    return res.status(403).json({ message: "Accès réservé aux enseignants" });
  }
  next();
}, documentController.updateDocument);

router.delete('/:id', protect, (req, res, next) => {
  if (req.user.role !== 'enseignant') {
    return res.status(403).json({ message: "Accès réservé aux enseignants" });
  }
  next();
}, documentController.deleteDocument);

module.exports = router;

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Ajouter un nouveau document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               matiere:
 *                 type: string
 *               niveau:
 *                 type: string
 *               enseignant:
 *                 type: string
 *               fichierUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document ajouté avec succès
 */
router.post('/', protect, documentController.createDocument);

