const express = require("express");
const app = express();
const router = require("./router/router");
const cors = require("./middlewares/cors");
const errorHandler = require("./utils/errorHandler");
const logger = require("./logger/loggerService");
const lodash = require("./lodash");
const connectToDb = require("./DB/dbService");
const config = require("config");
const {
    generateInitialCards,
    generateInitialUsers,
} = require("./initialData/initialDataService");


// Middleware - Appl Level
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("ERROR:", err.message);
    errorHandler(res, err.status || 500, err.message);
});



const PORT = config.get("PORT");
app.listen(PORT, () => {
    console.log(`INIT SERVER ON : http://localhost:${PORT}`);
    connectToDb();
    generateInitialCards();
    generateInitialUsers();
});