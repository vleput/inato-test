import { createLogger, format, transports } from "winston";

/**
 * Console logger - basic configuration (colors & simple format)
 */
const logger = createLogger({
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()]
});

module.exports = logger;
