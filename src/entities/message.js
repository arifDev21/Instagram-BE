const db = require('../models');
const Entity = require('./entity');
class Message extends Entity {
 constructor(model) {
  super(model);
 }
 getMessagesByRecevier(req, res) {
  const { receiver, sender } = req.query;
  db.Message.findAll({
   include: [
    {
     model: db.User,
     as: 'user_senders'
    },
    {
     model: db.User,
     as: 'user_recievers'
    }
   ],
   where: {
    user_sender_id: sender,
    user_reciever_id: receiver
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
 getMessages(req, res) {
  const { receiver, sender } = req.query;
  console.log(req.query);
  db.Message.findAll({
   include: [
    {
     model: db.User,
     as: 'user_senders',
     attributes: ['id', 'username', 'image_url']
    },
    {
     model: db.User,
     as: 'user_recievers',
     attributes: ['id', 'username', 'image_url']
    }
   ],
   where: {
    user_sender_id: { [db.Sequelize.Op.or]: [sender, receiver] },
    user_reciever_id: { [db.Sequelize.Op.or]: [receiver, sender] }
   },
   order: [['createdAt', 'ASC']]
  })
   .then((result) => {
    // global.io.on('connection', (socket) => {
    //  //  socket.join([sender, receiver].sort((a, b) => a - b).toString());
    // });
    res.send(result);
   })
   .catch((err) => res.status(500).send(err?.message));
 }
 postMessage(req, res) {
  const { receiver, sender, message } = req.body;
  const newMessage = {
   message,
   user_sender_id: sender,
   user_reciever_id: receiver
  };
  db.Message.create(newMessage)
   .then(async (result) => {
    const to = [sender, receiver].sort((a, b) => a - b).toString();
    console.log(to);
    global.io?.emit(`NEW_MESSAGE_${to}`, result.dataValues);
    //nama event = new_message
    // diterima dalam bentuk new_message/nama_event
    res.send(newMessage);
   })
   .catch((err) => res.status(500).send(err?.message));
 }
}

module.exports = Message;
