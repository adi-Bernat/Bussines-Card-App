const { register, logIn, find, findOne, update, changeIsBizStatus, remove } = require("../models/userDataAccessService");
const { validateRegistration, validateLogin } = require("../validations/userValidationService");
const normalizeUser = require("../helpers/normalizeUser");
const { generateUserPassword } = require("../helpers/bcrypt");



const registerUser = async (rawUser) => {
    try {
        const { error } = validateRegistration(rawUser);
        if (error) {
            return Promise.reject(error);
        }

        let user = normalizeUser(rawUser);
        user.password = generateUserPassword(user.password);
        user = await register(user);

        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};


const logInUser = async (rawUser) => {
    try {
        const { error } = validateLogin(rawUser);
        if (error) {
            return Promise.reject(error);
        }
        let user = { ...rawUser };
        user = await logIn(user);

        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
};


const getUsers = async () => {
    try {
        const users = await find();
        return (users);
    } catch (error) {
        return Promise.resolve(error);
    }
};

const getUser = async (userId) => {
    try {
        const user = await findOne(userId);
        return (user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateUser = async (userId, rawUser) => {
    try {
        let user = { ...rawUser };
        user = await update(userId, user);
        return (user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const changeUserBusinessStatus = async (userId) => {
    try {
        const user = changeIsBizStatus(userId);
        return (user);
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await remove(userId);
        return (`user ${user}, ${userId} deleted!`)
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = {
    registerUser, deleteUser, changeUserBusinessStatus, updateUser, getUser, logInUser, getUsers
};