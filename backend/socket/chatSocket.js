// module1Socket.js
const socketIO = require('socket.io');
const jwt = require("jsonwebtoken");
const chatRepository = require('./../src/repositories/chat.repository')
let Message = require('./../src/models/message.model');
function getUserId(authToken){
  let userId = null
  try{
    let payload = jwt.verify(authToken, process.env.SESSION_SECRET);
    if(payload)
      userId =  payload.id;
  }
  catch(error){
    console.log(error.message);
  }
  return userId;
}
function chatSocket(server) {
  console.log('Initializing Chat Socket')
  const io = socketIO(server);

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    let userId = getUserId(token);

    if(!userId){
      return next(new Error("invalid username"))
    }
    console.log(userId)
    socket.userId = userId;
    next();
  });

  io.on('connection', (socket) => {
    socket.join(socket.userId);
    console.log(io.sockets.adapter.rooms);
    // Handle specific events for Module 1 Socket
    socket.on('sendMessage', (userId, message) => {
      console.log(socket.userId, userId, message);
      console.log(io.sockets.adapter.rooms);
      let newMessage = new Message({sender: socket.userId, receiver: userId, message: message})
      console.log(io.sockets.adapter.rooms.get(socket.userId))
      // Handle the event
      if(io.sockets.adapter.rooms.get(userId) ){
        socket.to(userId).emit('receiveMessage', newMessage);
      }
      
      io.sockets.in(socket.userId).emit('sentMessage',  newMessage);

      
      newMessage.save();
    });

    // Handle specific events for Module 1 Socket
    socket.on('deleteMessage', (userId, messageId) => {
      
      // Handle the event
      if(io.sockets.adapter.rooms.get(userId)){
        socket.to(userId).emit('onDeleteMessage', messageId);
      }
      chatRepository.deleteMessage(messageId)
    });

    // More event handlers...

    socket.on('disconnect', () => {
      socket.leave(socket.userId);
    });
  });
}

module.exports = chatSocket;



// io.on("connection", (socket) => {
//   // persist session
//   sessionStore.saveSession(socket.sessionID, {
//     userID: socket.userID,
//     username: socket.username,
//     connected: true,
//   });

//   // emit session details
//   socket.emit("session", {
//     sessionID: socket.sessionID,
//     userID: socket.userID,
//   });

//   // join the "userID" room
//   socket.join(socket.userID);

//   // fetch existing users
//   const users = [];
//   const messagesPerUser = new Map();
//   messageStore.findMessagesForUser(socket.userID).forEach((message) => {
//     const { from, to } = message;
//     const otherUser = socket.userID === from ? to : from;
//     if (messagesPerUser.has(otherUser)) {
//       messagesPerUser.get(otherUser).push(message);
//     } else {
//       messagesPerUser.set(otherUser, [message]);
//     }
//   });
//   sessionStore.findAllSessions().forEach((session) => {
//     users.push({
//       userID: session.userID,
//       username: session.username,
//       connected: session.connected,
//       messages: messagesPerUser.get(session.userID) || [],
//     });
//   });
//   socket.emit("users", users);

//   // notify existing users
//   socket.broadcast.emit("user connected", {
//     userID: socket.userID,
//     username: socket.username,
//     connected: true,
//     messages: [],
//   });

//   // forward the private message to the right recipient (and to other tabs of the sender)
//   socket.on("private message", ({ content, to }) => {
//     const message = {
//       content,
//       from: socket.userID,
//       to,
//     };
//     socket.to(to).to(socket.userID).emit("private message", message);
//     messageStore.saveMessage(message);
//   });

//   // notify users upon disconnection
//   socket.on("disconnect", async () => {
//     const matchingSockets = await io.in(socket.userID).allSockets();
//     const isDisconnected = matchingSockets.size === 0;
//     if (isDisconnected) {
//       // notify other users
//       socket.broadcast.emit("user disconnected", socket.userID);
//       // update the connection status of the session
//       sessionStore.saveSession(socket.sessionID, {
//         userID: socket.userID,
//         username: socket.username,
//         connected: false,
//       });
//     }
//   });
// });