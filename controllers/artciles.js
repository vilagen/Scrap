const db = require("../models");
const redis = require("redis");  

const redisClient = redis.createClient(process.env.REDIS_URI);

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    console.log(reply)
    if (err || !reply) {
      return res.status(400).json("Unauthorized.")
    }
    return res.json({id: reply})
  }); 
};

const saveArticle = (req, res, err) => {
  const articles = req.body;
  article.user_id
  db.Article
  .create(req.body)
  .then( data => res.json(data))
  .catch(err => res.status(422).josn(""))
}

module.exports = {
  getAuthTokenId, saveArticle
}