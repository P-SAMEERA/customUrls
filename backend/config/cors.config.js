const cors = require('cors');

// List of allowed origins
const whitelist = ['http://dr-ait/:id', 'http://localhost:5000', 'http://localhost:3000','*'];

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 1 day
};

module.exports = { corsOptions };
