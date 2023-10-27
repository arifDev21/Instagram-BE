const db = require('../models');
const Entity = require('./entity');
class Post extends Entity {
 constructor(model) {
  super(model);
 }

 getPosts(req, res) {
  const limit = 2;
  const page = req.query.page;
  db.Post.findAll({
   include: [
    {
     model: db.User,
     as: 'user',
     attributes: ['id', 'username', 'image_url']
    },
    {
     model: db.PostLike,
     as: 'postlikes',
     include: {
      model: db.User,
      as: 'user',
      attributes: ['id', 'username', 'image_url']
     },

     order: [['createdAt', 'DESC']]
    },
    {
     model: db.Comment,
     as: 'comments',
     include: {
      model: db.User,
      as: 'user',
      attributes: ['id', 'username', 'image_url']
     }
    }
   ],
   order: [['createdAt', 'DESC']],
   offset: (page - 1) * limit,
   limit: limit
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
 getPostsByUserId(req, res) {
  db.Post.findAll({
   include: [
    {
     model: db.User,
     as: 'user',
     attributes: ['id', 'username', 'image_url']
    },
    {
     model: db.PostLike,
     as: 'postlikes',
     include: {
      model: db.User,
      as: 'user',
      attributes: ['id', 'username', 'image_url']
     }
    }
   ],
   where: {
    user_id: req.params.userid
   },
   order: [['createdAt', 'DESC']]
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
 getPostByFilter(req, res) {
  db.Post.findAll({
   include: {
    model: db.User,
    as: 'user',
    attributes: ['id', 'username', 'image_url']
   },
   where: {
    [db.Sequelize.Op.or]: {
     caption: { [db.Sequelize.Op.like]: `%${req.query.search}%` },
     '$user.username$': { [db.Sequelize.Op.like]: `%${req.query.search}%` }
    }
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
 async createPost(req, res) {
  try {
   if (req?.file?.filename) req.body.image_url = req.file.filename;
   else delete req.body.image_url;
   this.create(req, res);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
 async editPost(req, res) {
  try {
   if (req?.file?.filename) req.body.image_url = req.file.filename;
   else delete req.body.image_url;
   this.updateById(req, res);
  } catch (err) {
   res.status(500).send(err?.message);
  }
 }
}

module.exports = Post;
