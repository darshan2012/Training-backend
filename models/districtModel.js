const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    districtname:{
        type: String
    },
    state:{
        type: Schema.Types.ObjectId,
        ref: 'States'
    }
});

module.exports = mongoose.model("Districts", districtSchema);