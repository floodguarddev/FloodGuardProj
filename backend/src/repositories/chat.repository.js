let Message = require('./../models/message.model');
const ObjectId = require('mongoose').Types.ObjectId;
async function getContactsHistory(id){
    let contactsHistory = Message.aggregate([
        {
          $match: {
            $or: [
              {
                sender: new ObjectId(id),
              },
              {
                receiver: new ObjectId(id),
              },
            ],
          },
        },
        {
          $project: {
            "user": {
                  $cond: {
                     if: { $eq: [ new ObjectId(id), "$sender" ] },
                     then: "$receiver",
                     else: "$sender"
                  }
              },
            "message": 1,
            "status": {
                  $cond: {
                     if: { $eq: [ new ObjectId(id), "$sender" ] },
                     then: "send",
                     else: "receive"
                  }
              },
            "createdAt": 1
          }
        },
        {
        $group: {
          _id: "$user",
          latestMessage: {
            $push: {
              message: "$message",
              createdAt: "$createdAt",
              status: "$status"
            }
          },
          latestCreatedAt: {
            $max: "$createdAt"
          }
        }
      },
      {
        $project: {
          _id: 1,
          latestMessage: {
            $filter: {
              input: "$latestMessage",
              cond: { $eq: ["$latestCreatedAt", "$$this.createdAt"] }
            }
          }
        }
      },
        {$unwind:{
          path: "$latestMessage"
        }},
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: {
            path: "$user"
          }
        }
        ,
        {
          $lookup: {
            from: "rescuers",
            localField: "_id",
            foreignField: "userId",
            as: "rescuer"
          }
        },
        {
          $unwind: {
            path: "$rescuer",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "ngos",
            localField: "_id",
            foreignField: "userId",
            as: "ngo"
          }
        },
        {
          $unwind: {
            path: "$ngo",
            preserveNullAndEmptyArrays: true
        }
      }
      ]);
    
    return contactsHistory;
}

async function getChat(userId, secUserId){
  let chat = Message.aggregate([
    {
      $match: {
        $or: [
          {
            $and: [
              {
                sender: new ObjectId(
                  userId
                ),
              },
              {
                receiver: new ObjectId(
                  secUserId
                ),
              },
            ],
          },
          {
            $and: [
              {
                sender: new ObjectId(
                  secUserId
                ),
              },
              {
                receiver: new ObjectId(
                  userId
                ),
              },
            ],
          },
        ],
      },
    },
    {
      $project: {
        user: {
          $cond: {
            if: {
              $eq: [
                new ObjectId(
                  userId
                ),
                "$sender",
              ],
            },
            then: "$receiver",
            else: "$sender",
          },
        },
        message: 1,
        status: {
          $cond: {
            if: {
              $eq: [
                new ObjectId(
                  userId
                ),
                "$sender",
              ],
            },
            then: "send",
            else: "receive",
          },
        },
        createdAt: 1,
      },
    },
    {
      $group: {
        _id: "$user",
        messages: {
          $push: {
            id: "$_id",
            message: "$message",
            createdAt: "$createdAt",
            status: "$status",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "rescuers",
        localField: "_id",
        foreignField: "userId",
        as: "rescuer",
      },
    },
    {
      $unwind: {
        path: "$rescuer",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "ngos",
        localField: "_id",
        foreignField: "userId",
        as: "ngo",
      },
    },
    {
      $unwind: {
        path: "$ngo",
        preserveNullAndEmptyArrays: true,
      },
    },
    ]);
  
  return chat;
}

async function addMessage(userId, targetId, message){
  const newMessage = Message.create({
    sender: userId,
    receiver: targetId,
    content: message
  })

  return newMessage
}

async function deleteMessage(messageId){
  await Message.deleteOne({_id: messageId})
}

module.exports = {getContactsHistory, getChat, addMessage, deleteMessage}