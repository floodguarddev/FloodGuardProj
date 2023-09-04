const mongoose = require("mongoose")
const Schema = mongoose.Schema

Camera = new Schema({
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    installedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    packageRemaining: {
      type: Date,
      required: true,
      default: new Date(1,1,2020),
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    installedBy: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Rescuer"
    }
});
  
Camera.index({ location: '2dsphere' });

module.exports = mongoose.model("Camera", Camera)