const express = require("express");
const handleError = require("../../utils/errorHandler");
const {
    getCards,
    getCard,
    createCard,
    getMyCards,
    updateCard,
    likeCard,
    deleteCard,
} = require("../services/cardServices");
const router = express.Router();
const { auth } = require("../../auth/authService");

router.get("/", async (req, res) => {
    try {
        const cards = await getCards();
        return res.send(cards);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get("/my-cards", async (req, res) => {
    try {
        const userId = 123456;
        const card = await getMyCards(userId);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const card = await getCard(id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { isBusiness, _id } = req.user;
        if (!isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business users can create cards!"
            );
        }
        const card = await createCard({ ...req.body, user_id: _id });

        return res.status(201).send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const card = await getCard(id);
        if (!card) {
            return handleError(res, 404, "Card not found");
        }

        if (card.user_id.toString() !== _id) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the card creator can edit this card!"
            );
        }
        const updatedCard = await updateCard(id, req.body);
        return res.send(updatedCard);

    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const card = await likeCard(id, _id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, isAdmin } = req.user;
        const card = await getCard(id);

        if (!card) {
            return handleError(res, 404, "Card not found");
        }
        if (!isAdmin && card.user_id.toString() !== _id) {
            return handleError(
                res,
                403,
                "Authorization Error: Only admin or card owner can delete this card"
            );
        }
        const deletedCard = await deleteCard(id);
        return res.send(deletedCard);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


module.exports = router;