const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    statename:{
        type: String
    }
});

module.exports = mongoose.model("States", stateSchema);
