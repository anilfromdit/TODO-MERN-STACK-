const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type:String,
  },
  description: {
type:String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
