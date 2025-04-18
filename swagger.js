const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StudyZone API',
      version: '1.0.0',
      description: 'Documentation de l\'API de StudyZone',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
      {
        url: 'https://studyzone-4gbd.onrender.com',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Tous les fichiers de routes
};
