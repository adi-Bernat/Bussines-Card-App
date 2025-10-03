const Card = require("../models/mongodb/Card");
const { handleBadRequest } = require("../../utils/errorHandler");
const config = require("config");

const DB = config.get("DB");

const find = async () => {
    if (DB === "MONGODB") {
        try {
            const cards = await Card.find();
            return Promise.resolve(cards);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoose", error);
        }
    }
    return Promise.resolve("get cards not in mongodb");

};

const findMyCards = async (userId) => {
    if (DB === "MONGODB") {
        try {
            return Promise.resolve(`my cards: ${userId}`);
        } catch (error) {
            error.status = 404;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("get card not in database");
};

const findOne = async (id) => {
    if (DB === "MONGODB") {
        try {
            const card = await Card.findById(id);

            if (!card) {
                throw new Error("could not find this card in the database");
            }

            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoos", error);
        }
    }

    return Promise.resolve({});
};


const create = async (normalizedCard) => {
    if (DB === "MONGODB") {
        try {
            let card = new Card(normalizedCard);
            card = await card.save();
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("create card not in database");
};

const update = async (id, normalizedCard) => {
    if (DB === "MONGODB ") {
        try {
            const card = Card.findByIdAndUpdate(id,
                normalizedCard,
                { new: true }
            );
            if (!card) {
                throw new Error(`could not update thise card because a card with thise ID cannot be found in the database`);
            }
            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            return handleBadRequest("Mongoos", error);
        }
    }

    return Promise.resolve("card deleted not in mongodb");
};


const like = async (id, userId) => {
    if (DB === "MONGODB") {
        try {
            const card = Card.findById(id);
            if (!card) {
                throw new Error(`could not change card like because a card with this ID cannot be found in the database`);
            }
            const likeIndex = card.likes.indexOf(userId);

            if (likeIndex === -1) {

                card.likes.push(userId);
            } else {

                card.likes.splice(likeIndex, 1);
            }

            await card.save();
        } catch (error) {
            error.status = 400;
            return handleBadRequest("Mongoos", error);
        }
    }
    return Promise.resolve("card update!");
};

const remove = async (id) => {
    if (DB === "MONGODB") {
        try {
            const card = Card.findByIdAndDelete(id);
            if (!card) {
                throw new Error(`could not delete this card because a card with this ID cannot be found in the database`)
            }
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            handleBadRequest("Mongoos", error);
        }
    }
    return Promise.resolve("card deleted not in mongodb!");
};

module.exports = { find, findMyCards, findOne, create, update, like, remove };