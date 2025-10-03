const express = require("express");
const { handleError } = require("../../utils/errorHandler");
const { registerUser, deleteUser, changeUserBusinessStatus, updateUser, getUser, logInUser, getUsers } = require("../services/userService");
const { create } = require("../models/userDataAccessService");
const router = express.Router();
const { auth } = require("../../auth/authService");

router.get("/", auth, async (req, res) => {
    try {
        const { isAdmin } = req.user;
        if (!isAdmin) {
            handleError(res, 403, "Authorization Error: Must be admin!");
        }
        const user = await getUsers();
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const { _id, isAdmin } = req.user;
        if (_id !== id && !isAdmin) {
            handleError(
                res,
                403,
                "Authorization Error: Must be admin or THE registered user!"
            );
        }

        const user = await getUser(id);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


router.post("/register", async (req, res) => {
    try {
        const newUser = await registerUser(req.body);
        return res.status(201).send(newUser)
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await logInUser(req.body);
        return res.send(`user ${user} is login!`)
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;

        if (_id.toString() !== id.toString()) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the owner of this profile can update it!"
            );
        }
        const user = await updateUser(id, req.body);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, isAdmin } = req.user;
        if (_id !== id && !isAdmin) {
            return handleError(
                res,
                403,
                "Authorization Error: Must be admin or the registered user!"
            );
        }
        const user = await changeUserBusinessStatus(id, req.body);
        return res.send(user);

    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, isAdmin } = req.user;
        if (_id !== id && !isAdmin) {
            return handleError(
                res,
                403,
                "Authorization Error: Must be admin or the registered user!"
            );
        }

        const user = await deleteUser(id);
        return res.send(`User with id ${id} is deleted!`);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


module.exports = router;