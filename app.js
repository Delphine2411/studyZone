const express = require('express');
const app = express();
const documentRoutes = require('./routes/documentRoute');
// Middlewares
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);

app.use('/api/documents', documentRoutes);
app.use('/uploads', express.static('uploads'));

module.exports = app;
//PDMGau9q3vYvjHHB


