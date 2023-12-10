// const notificationServices = require('../services/notifications.services');
// const { dataResponse } = require('../helpers/dataResponse');

// async function getAllNotifications(req, res, next) {
// 	try {
// 		const notifications = await notificationServices.getAllNotifications();
// 		return res.send(dataResponse("success", { notifications }));
// 	} catch (error) {
// 		next(error);
// 	}
// }

// async function markAsReadNotificationById(req, res, next) {
// 	try {
// 		const notification = await notificationServices.markAsReadNotificationById(req.params.notificationId);
// 		return res.send(dataResponse("success", { notification }));
// 	} catch (error) {
// 		next(error);
// 	}
// }

// async function createNotification(req, res, next) {
// 	try {
// 		const notification = await notificationServices.createNotification(req.body.userId, req.body.title, req.body.description);
// 		return res.send(dataResponse("success", { notification }));
// 	} catch (error) {
// 		next(error);
// 	}
// }

// module.exports = { getAllNotifications, markAsReadNotificationById, createNotification };