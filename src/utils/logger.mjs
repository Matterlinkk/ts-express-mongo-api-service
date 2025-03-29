import { createLogger, format, transports } from 'winston';
var combine = format.combine, timestamp = format.timestamp, printf = format.printf, colorize = format.colorize;
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp;
    return "".concat(timestamp, " [").concat(level, "]: ").concat(message);
});
export var logger = createLogger({
    level: 'info',
    format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});
