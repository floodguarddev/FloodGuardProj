const mongoose = require("mongoose")
const Schema = mongoose.Schema

Camera = new Schema({
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    lat: {
      type: Number,
      required: true
    },
    lon: {
      type: Number,
      required: true
    },
    installedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Rescuer"
    }
});

module.exports = mongoose.model("Camera", Camera)