const chalk = require("chalk");
const currentDateTimeStr = require("../utils/currentDateTimeStr")
const morgan = require("morgan");

const morganLogger = morgan((tokens, req, res) => {

    const status = Number(tokens.status(req, res));

    let logMessage = [
        currentDateTimeStr,
        tokens.method(req, res),
        tokens.url(req, res),
        status,
        "-",
        tokens["response-time"](req, res),
        "ms",
    ].join(" ");

    return (status >= 400 ? chalk.redBright : chalk.cyanBright)(logMessage);
});
module.exports = morganLogger;