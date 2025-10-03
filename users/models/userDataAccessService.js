const { handleBadRequest } = require("../../utils/errorHandler");
const User = require("../models/mongodb/User");
const _ = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const config = require("config");

const DB = config.get("DB");

const register = async (normalizeUser) => {
    if (DB === "MONGODB") {
        try {
            const { email } = normalizeUser;

            let user = await User.findOne({ email });
            if (user) {
                throw new Error("User with this email already exists");
            }

            user = new User(normalizeUser);
            user = await user.save();

            user = _.pick(user, ["name", "email", "_id"]);

            return Promise.resolve(user);

        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }

    return Promise.resolve("create user not in database");
};


const logIn = async (normalizeUser) => {
    const { email, password } = normalizeUser;

    if (DB === "MONGODB") {
        try {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Authentication Error: Invalid email");

            const validPassword = comparePassword(password, user.password);
            if (!validPassword)
                throw new Error("Authentication Error: Invalid Password");
            const token = generateAuthToken(user);
            return Promise.resolve(token);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("loginUser user not in mongodb");
};


const find = async () => {
    if (DB === "MONGODB") {
        try {
            const users = await User.find().select("-password -__v");
            return Promise.resolve(users);
        } catch (error) {
            error.status = 400;
            return handleBadRequest("Mongoos", error);
        }
    }
    return Promise.resolve([]);
};



const findOne = async (id) => {
    if (DB === "MONGODB") {
        try {
            const user = await User.findById(id).select("-password -__v");

            if (!user) {
                throw new Error("Could not find this user in the database");
            }

            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("get user not in mongodb");
};




const update = async (id, normalizeUser) => {
    if (DB === "MONGODB") {
        try {
            const user = await User.findByIdAndUpdate(
                id,
                normalizeUser,
                { new: true }
            ).select(["-password", "-__v"]);

            if (!user) {
                throw new Error(
                    `could not update this user because a user with this ID cannot be found in the database`
                );
            }

            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoos", error);
        }
    }
    return Promise.resolve("user update Not in mongodb");
};


const changeIsBizStatus = async (id) => {
    if (DB === "MONGODB") {
        try {
            const pipeline = [
                { $set: { isBusiness: { $not: "$isBusiness" } } }
            ];

            const user = await User.findByIdAndUpdate(
                id,
                pipeline,
                { new: true }
            ).select("-password -__v");

            if (!user) {
                throw new Error(
                    "Could not change user IsBusiness status because a user with this ID cannot be found in the databade"
                );
            }

            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoos", error);
        }
    }

    return Promise.resolve("card update!");
};

const remove = async (id) => {
    if (DB === "MONGODB") {
        try {
            const user = User.findByIdAndDelete(id, { projection: { password: 0, __v: 0 } });
            if (!user) {
                throw new Error("could not delete this user with this ID cannot be found in the database");
            }
            return Promise.resolve(user);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoos", error);
        }
    }

    return Promise.resolve("user delete not in mongodb!");
};

module.exports = { register, logIn, find, findOne, update, changeIsBizStatus, remove };