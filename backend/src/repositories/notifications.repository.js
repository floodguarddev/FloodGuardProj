const AdminNotification = require('../models/admin_notification');
const createHttpError = require('http-errors');

async function getAllNotifications() {
	const notifications = await AdminNotification.find().catch(error => {
		throw new createHttpError.InternalServerError(error);
	});

	return (notifications);
}

async function createUserNotificationToAdmin(username, userImage, message, link) {
	const notification = await AdminNotification.create({ username,userImage, message, link }).catch(error => {
		throw new createHttpError.InternalServerError(error);
	});

	return (notification);
}

module.exports = { getAllNotifications, createUserNotificationToAdmin };