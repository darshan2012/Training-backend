const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  research: {
    type: Number,
  },
  development: {
    type: Number,
  },
  meeting: {
    type: Number,
  },
});

const moduleSchema = new Schema(
  {
    moduleName: {
      type: String,
    },
    tasks: [taskSchema],
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    name: {
      type: String,
    },
    modules: [moduleSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projects", projectSchema);
