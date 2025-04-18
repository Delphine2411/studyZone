const express = require('express');
const app = express();
const documentRoutes = require('./routes/documentRoute');
const path = require('path');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/documents', documentRoutes);
// Routes
const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);




module.exports = app;
//PDMGau9q3vYvjHHB


