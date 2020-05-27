const db = require("../models")
const jwt = require('jsonwebtoken');
const url = require('url');
const redis = require("redis"); 
let redisClient;

if (process.env.REDISCLOUD_UR) {
  const redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  redisClient.auth(redisURL.auth.split(":")[1]);
} else {
  redisClient = redis.createClient(process.env.REDIS_URI);
}


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