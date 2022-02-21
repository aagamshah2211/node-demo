var fs = require('fs');

var logsPath = './logs/';

var createLogFiles = function() {
    if (!fs.existsSync(logsPath + 'all-logs.log')) {
        fs.writeFile(logsPath + 'all-logs.log', "", function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }

    if (!fs.existsSync(logsPath + 'exceptions.log')) {
        fs.writeFile(logsPath + 'exceptions.log', "", function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
};

//create log files if they don't exist
if (!fs.existsSync(logsPath)) {
    // Create the directory if it does not exist
    fs.mkdirSync(logsPath);
}


if (process.env.NODE_ENV != 'production') {
    createLogFiles();
}

// set winston logger
var winston = require('winston');

winston.emitErrs = true;

var logger;

if (process.env.NODE_ENV != 'production') {
    logger = new(winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                timestamp: true,
                colorize: true
            }),

            new winston.transports.File({
                level: 'info',
                filename: logsPath + 'all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                timestamp: true,
                colorize: false
            })

        ],
        exitOnError: false,
        exceptionHandlers: [
            new winston.transports.File({ filename: logsPath + 'exceptions.log' })
        ]
    });
} else {
    logger = new(winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                json: false,
                timestamp: true,
                colorize: true
            }),
        ],
        exitOnError: false,
        exceptionHandlers: [
            new winston.transports.Console()
        ]
    });


}


// catch all exceptions to avoid server crashes
process.on('uncaughtException', function(err) {
    logger.error(err);
});

module.exports = logger;

module.exports.stream = {
    write: function(message) {
        logger.info(message);
    }
};