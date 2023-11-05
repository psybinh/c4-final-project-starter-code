import * as winston from 'winston'

/**
 * Create a logger instance to write log messages in JSON format. TODO excute by ThienNLNT - 24-10:
 *
 * @param loggerName - a name of a logger that will be added to all messages TODO excute by ThienNLNT - 24-10:
 */
export function createLogger(loggerName: string) {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { name: loggerName },
    transports: [
      new winston.transports.Console()
    ]
  })
}