const loginValidation = require("./joi/loginValidation");
const registerValidation = require("./joi/registerValidation");
const userUpdateValidation = require("./joi/userUpdateValidation");
const validator = undefined || "joi";

const validateRegistration = user => {
    if (validator === "joi")
        return registerValidation(user);

};

const validateLogin = user => {
    if (validator === "joi")
        return loginValidation(user);
};

const validateUserUpdate = (user) => {
    if (validator === "joi") {
        return userUpdateValidation(user);
    }
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.validateUserUpdate = userUpdateValidation;