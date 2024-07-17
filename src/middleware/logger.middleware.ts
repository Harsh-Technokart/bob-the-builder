import {
  createLogger,
  format,
  type Logform,
  type Logger,
  transports,
} from "winston";
import moment from "moment-timezone";
import path from "path";
const { combine, label, printf } = format;

let logger: Logger;

const appendTimestamp = format((info, opts) => {
  info.timestamp = moment().tz(opts.tz).format();
  return info;
});

function loggerFormat(): Logform.Format {
  return printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
}

function configureLogger(): void {
  logger = createLogger({
    level: "info",
    format: combine(
      label({ label: "main" }),
      appendTimestamp({ tz: "Asia/Kolkata" }),
      loggerFormat()
    ),
  });
  checkProduction();
}

function checkProduction(): void {
  logger.add(new transports.Console());
  logger.add(
    new transports.File({
      filename: path.join(__dirname, "..", "logs", "server.log"),
      level: "info",
    })
  );
  logger.add(
    new transports.File({
      filename: path.join(__dirname, "..", "logs", "error.log"),
      level: "error",
    })
  );
}

function info(message: string): void {
  logger.info(message);
}

function logError(message: any | unknown): void {
  logger.error(message);
}

export { info, logError, configureLogger };
