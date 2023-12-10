const createHttpError = require('http-errors');
const notificationRepository = require('../repositories/notifications.repository');

/** User Notification to Admin */
async function createUserNotificationToAdmin(username, userImage, message, link) {
    const notification = await notificationRepository.createUserNotificationToAdmin(username, userImage, message, link);
    if (!notification)
        throw new createHttpError.InternalServerError("Notification couldn't be created");
    return notification;
}


async function getAllNotifications(){
	const notifications = await notificationRepository.getAllNotifications();
	if(!notifications)
		throw new createHttpError.NotFound("No new notifications exist");
	return notifications;
}

async function deleteNotificationById(notificationId){
	const notification = await notificationRepository.deleteNotificationById(notificationId);
	if(!notification)
		throw new createHttpError.NotFound("Notification with the given information doesn't exist");
	return notification;
}

module.exports = {getAllNotifications, deleteNotificationById, createUserNotificationToAdmin};