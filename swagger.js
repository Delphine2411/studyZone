// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
  },

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
  
  apis: ['./routes/*.js'], // Tu peux pointer vers tous tes fichiers de routes
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
