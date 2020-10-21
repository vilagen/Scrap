const db = require("../models");
const redis = require("redis"); 
const url = require('url'); 
// const redisClient = redis.createClient(process.env.REDIS_URI);

const redisURL = url.parse(process.env.REDISCLOUD_URL);
const redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
redisClient.auth(redisURL.auth.split(":")[1]);

const saveArticle = (req, res, err) => {
  const articles = req.body;
  const { authorization } = req.headers;
  if (authorization) {
    return redisClient.get(authorization, (err, reply) => {
      articles.UserId = reply
      db.Article
      .create(req.body)
      .then( data => res.json(data))
      .catch(err => res.status(422).json("Error " + err))
      db.User.findByPk(reply).then ( (user, err) => {
        if(user) {
          user.increment('saved_entries');
        }
        else {
          res.status(400).json(`Error updating article count after saving. ${err}`);
        }
      })
    });
  } else {
    return res.status(400).json("Unathorized; not able to save article.")
  }
};

const deleteArticle = (req, res, err) => {
  // console.log(res);
  const {id} = req.params;
  db.Article
  .findByPk(id)
  .then(dbArticle => {
      db.User.findOne(
        {where: {id: dbArticle.UserId} }).then( (user, err) => {
        if(user) {
          user.decrement('saved_entries');
        }
        else {
          res.status(400).json(`Error updating article count after saving. ${err}`);
        }
      })
    }
  )
  db.Article
  .findByPk(id)
  .then(dbArticle => dbArticle.destroy())
  .then(dbArticle => res.json(dbArticle))
  .catch(err => res.status(422).json(err));
};

module.exports = {
  saveArticle, 
  deleteArticle
};