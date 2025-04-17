const multer = require('multer');
const path = require('path');

// Définir l'emplacement de sauvegarde des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // le dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});

// Filtrer les fichiers autorisés (PDF uniquement ici)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF, JPG ou PNG sont autorisés'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
