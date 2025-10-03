const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const userName = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");

mongoose
    .connect(
        `mongodb+srv://${userName}:${password}@adiweb.a3gyguy.mongodb.net/`
    )
    .then(() => console.log(chalk.magentaBright("Connect To Atlas MongoDB!")))
    .catch((error) => {
        console.log(chalk.redBright(error));
    });