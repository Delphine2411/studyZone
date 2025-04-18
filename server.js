const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const setupSwagger = require('./swagger');
dotenv.config();
connectDB(); // Connexion à MongoDB
setupSwagger(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port http://localhost:${PORT}`);
});

