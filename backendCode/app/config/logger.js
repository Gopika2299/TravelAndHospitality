const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console() // Output to console
  ]
});

module.exports = logger;
