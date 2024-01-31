const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const companySchema = new Schema({
    companyname:{
        type: String
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'States'
    },
    district:{
        type: Schema.Types.ObjectId,
        ref: 'Districts'
    }
});
    
module.exports = mongoose.model("Companies", companySchema);