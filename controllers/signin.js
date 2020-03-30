const db = require("../models")
const jwt = require('jsonwebtoken');
const redis = require("redis");  
const bcrypt = require("bcryptjs");

const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (req, res, next) => {
  const {username, password} = req.body;
  if(!username || !password) {
    return res.json("Missing username or password")
    // return Promise.reject("Missing username or password.")
  }
  
  db.Login.findOne( {where: {username:username} }).then( (user, err) => {
    // check if user is in database
    if(err) {return res.json(`Error signing in while finding user. \n ${err}`)};
    if(!user) {return res.json(`Error; cannot find username. \n ${err}`)};

    // check to validate password
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      console.log(user);
      return res.json(user)
      .catch(err => res.json(`There was an error retrieving user. \n ${err}`));
    };
    if (!isValid) {
      return res.json("Password was incorrect.");
    };
  });
};

module.exports = {
  handleSignin: handleSignin
}