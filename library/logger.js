const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    label({ label: 'error' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({ level: 'error' }),
    new transports.File({
      filename: 'error.log',
      level: 'info'
    })
  ]
});

module.exports = logger