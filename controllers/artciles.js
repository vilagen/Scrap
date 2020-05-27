const db = require("../models");
const redis = require("redis");  
// const redisClient = redis.createClient(process.env.REDIS_URI);
// const redisURL = url.parse(process.env.REDISCLOUD_URL);
// const redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
// redisClient.auth(redisURL.auth.split(":")[1]);

let redisClient;

if (process.env.REDISCLOUD_UR) {
  const redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  redisClient.auth(redisURL.auth.split(":")[1]);
} else {
  redisClient = redis.createClient(process.env.REDIS_URI);
}

const saveArticle = (req, res, err) => {
  const articles = req.body;
  const { authorization } = req.headers;
  console.log("saveArticle " + authorization);
  if (authorization) {
    return redisClient.get(authorization, (err, reply) => {
      articles.UserId = reply
      db.Article
      .create(req.body)
      .then( data => res.json(data))
      .catch(err => res.status(422).json("Error " + err))
    });
  } else {
    return res.status(400).json("Unathorized; not able to save article.")
  }
};

const deleteArticle = (req, res, err) => {
  const {id} = req.params;
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