const db = require('../models');
const Entity = require('./entity');
class Follow extends Entity {
 constructor(model) {
  super(model);
 }
 async follow(req, res) {
  try {
   const { followed_user_id, following_user_id } = req.body; // 1, 17
   console.log(req.body);
   const check = await db.Follow.findOne({
    where: {
     followed_user_id,
     following_user_id
    }
   });
   console.log(check);
   if (check) {
    await db.Follow.destroy({
     where: {
      followed_user_id,
      following_user_id
     }
    }); //unfollow
   } else await db.Follow.create(req.body); //follow

   res.send('success');
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
 async getFollowersByUsername(req, res) {
  const { username } = req.params;
  db.Follow.findAll({
   include: {
    model: db.User,
    as: 'following_user_id',
    attributes: ['id', 'username', 'image_url'],
    where: {
     username
    }
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.send(err?.message));
 }
 async getFollowingByUsername(req, res) {
  const { username } = req.params;
  db.Follow.findAll({
   include: {
    model: db.User,
    as: 'followed_user_id',
    attributes: ['id', 'username', 'image_url'],
    where: {
     username
    }
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.send(err?.message));
 }
}
module.exports = Follow;
