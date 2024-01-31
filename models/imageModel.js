const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    imageBase64: {
        type : String,
        required : true
    },
    ext : {
        type: String
    },
    type: {
        type: String
    }
})
module.exports = mongoose.model("Images", imageSchema);