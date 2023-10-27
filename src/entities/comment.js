const Entity = require('./entity');
const db = require('../models');

class Comment extends Entity {
 constructor(model) {
  super(model);
 }
 getByUsername(req, res) {
  const { username } = req.params;
  db.Comment.findAll({
   include: {
    model: db.User,
    as: 'user',
    attributes: ['id', 'username', 'image_url'],
    where: {
     username
    }
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.send(err?.message));
 }
 getByPostId(req, res) {
  const { postid } = req.params;
  db.Comment.findAll({
   include: {
    model: db.User,
    as: 'user',
    attributes: ['id', 'username', 'image_url']
   },
   where: {
    post_id: postid
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.send(err?.message));
 }
 async addComment(req, res) {
  try {
   await db.Comment.create(req.body);
   req.params.postid = req.body.post_id;
   this.getByPostId(req, res);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
}
module.exports = Comment;
