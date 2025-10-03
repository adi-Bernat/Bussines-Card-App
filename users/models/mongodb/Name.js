const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const Name = new mongoose.Schema({
    first: {
        type: String,
        minlength: 2,
        required: true
    },
    last: {
        type: String,
        minlength: 2,
        required: true
    }

});

module.exports = Name;