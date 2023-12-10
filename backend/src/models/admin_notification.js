const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdminNotification = new Schema({
	username: {
		type: String,
		required: true,
	},
	userImage: {
		type: String,
		required: true,
		default: null
	},
	message: { type: String, required: true },
	link: { type: String, required: true },
}, {
	timestamps: true
})

module.exports = mongoose.model("AdminNotification", AdminNotification)