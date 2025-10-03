const chalk = require("chalk");

const handleError = (res, status, message = "") => {
    console.error(chalk.red(message));
    res.status(status).send(message);
};

const handleBadRequest = async (validator, error) => {
    const errorMessage = `${validator} Error: ${error.message}`;
    error.message = errorMessage;
    error.status = error.status || 400;
    return Promise.reject(error);
};

const handleJoiError = async (error) => {
    const joiError = new Error(error.details[0].message);
    return handleBadRequest("joi", joiError);
}
module.exports = { handleError, handleBadRequest, handleJoiError };