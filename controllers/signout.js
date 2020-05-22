const db = require("../models")
const jwt = require('jsonwebtoken');
const redis = require("redis");  
// const redisClient = redis.createClient(process.env.REDIS_URI);
const redisClient = redis.createClient(process.env.REDIS_URL);

const handleSignout = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.DEL(authorization, (err, reply) => {
    console.log('Token deleted.');
    if(err || !reply) {
      return res.status(400).json('Token not deleted');
    };
    return res.json("Token deleted.")
  });
};

module.exports = {
  handleSignout: handleSignout
};