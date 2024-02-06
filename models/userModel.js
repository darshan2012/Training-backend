const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
  name: {
    type: String,
  },
  month: {
    type: String,
  },
  hours: {
    type: Number,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: "Username already exist",
    required: true,
  },
  password: {
    type: String,
    required: true,
    //cannot validate here because the password is hashed
    // validate: {
    //   validator: function (password) {
    //     const regex =
    //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{8,20}$/;
    //     return regex.test(password);
    //   },
    //   message:
    //     "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    // },
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "Unsupported Value",
    },
    required: true,
  },
  address: {
    type: String,
  },
  profilePicture: {
    type: Object,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Companies",
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "States",
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "Districts",
  },
  workDetails: [workSchema],
});
module.exports = mongoose.model("Users", userSchema);
